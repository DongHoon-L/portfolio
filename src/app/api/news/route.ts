import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'en';
  
  const folder = lang === 'ko' ? 'Kor' : 'Eng';
  const newsDir = path.join(process.cwd(), 'News', folder);
  
  try {
    if (!fs.existsSync(newsDir)) {
      return NextResponse.json([]);
    }
    
    const files = fs.readdirSync(newsDir).filter(file => file.endsWith('.md'));
    const newsList = files.map(file => {
      const content = fs.readFileSync(path.join(newsDir, file), { encoding: 'utf8' });
      const match = content.match(/^(?:#|##)\s+([^#\n\r]+)$/m);
      const title = match ? match[1].trim() : file.replace('.md', '');
      const stat = fs.statSync(path.join(newsDir, file));
      
      return {
        id: file,
        title,
        date: stat.mtime.toISOString().split('T')[0]
      };
    });
    
    // Sort by date descending
    newsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return NextResponse.json(newsList);
  } catch (error) {
    console.error('Error reading news:', error);
    return NextResponse.json([]);
  }
}
