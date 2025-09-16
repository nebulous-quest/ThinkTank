import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// Get all blog posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = `
      SELECT bp.*, u.username as author_name, c.name as category_name
      FROM blog_posts bp
      JOIN users u ON bp.author_id = u.id
      LEFT JOIN categories c ON bp.category_id = c.id
    `;

    let params = [];

    if (category) {
      query += ' WHERE c.name = $1';
      params.push(category);
    }

    query += ' ORDER BY bp.created_at DESC';

    const result = await pool.query(query, params);

    return NextResponse.json({ posts: result.rows });

  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Create new blog post
export async function POST(request) {
  try {
    const { title, content, author_id, category_id, featured_image } = await request.json();

    if (!title || !content || !author_id) {
      return NextResponse.json({ error: 'Title, content, and author are required' }, { status: 400 });
    }

    const result = await pool.query(
      'INSERT INTO blog_posts (title, content, author_id, category_id, featured_image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, content, author_id, category_id, featured_image]
    );

    return NextResponse.json({ post: result.rows[0] }, { status: 201 });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
