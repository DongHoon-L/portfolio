import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const params = await context.params;
  const slug = params.slug;
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'en';
  
  const folder = lang === 'ko' ? 'Kor' : 'Eng';
  const filePath = path.join(process.cwd(), 'News', folder, slug);
  
  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }
    
    const content = fs.readFileSync(filePath, { encoding: 'utf8' });
    const firstLine = content.split('\n')[0];
    const title = firstLine.replace(/^#\s*/, '').trim() || slug;
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
