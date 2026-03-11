import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const params = await context.params;
  const slug = decodeURIComponent(params.slug);
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'en';
  
  const folder = lang === 'ko' ? 'Kor' : 'Eng';
  
  // 만약 확장자가 누락되었다면 .md 강제 추가
  const fileName = slug.endsWith('.md') ? slug : `${slug}.md`;
  
  let filePath = path.join(process.cwd(), 'News', folder, fileName);
  
  try {
    // 1차적으로 현재 언어(lang) 폴더에서 탐색
    if (!fs.existsSync(filePath)) {
      // 2차 탐색: 뉴스 링크를 복사해 공유하거나, 초기 로딩 시 locale 상태가 안 맞을 경우 대비
      const altFolder = folder === 'Kor' ? 'Eng' : 'Kor';
      const altFilePath = path.join(process.cwd(), 'News', altFolder, fileName);
      if (fs.existsSync(altFilePath)) {
        filePath = altFilePath;
      } else {
        return NextResponse.json({ error: 'News not found' }, { status: 404 });
      }
    }
    
    // utf-8 명시
    const content = fs.readFileSync(filePath, { encoding: 'utf8' });
    const firstLine = content.split('\n')[0];
    const title = firstLine.replace(/^#\s*/, '').trim() || fileName;
    const stat = fs.statSync(filePath);
    
    return NextResponse.json({
      id: slug,
      title,
      date: stat.mtime.toISOString().split('T')[0],
      content
    });
  } catch (error) {
    console.error('Error reading news detail:', error);
    return NextResponse.json({ error: 'Failed to read news' }, { status: 500 });
  }
}
