import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PostsService {
  private prisma = new PrismaClient();

  async fetchAndStorePosts() {
    const fetch = (await import('node-fetch')).default;
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const posts = await res.json() as { title: string; body: string; userId: number }[];

    // Store in DB (avoid duplicates by clearing first)
    await this.prisma.post.deleteMany();
    await this.prisma.post.createMany({ data: posts });

    return { message: 'Posts fetched and stored successfully', count: posts.length };
  }

  async getAllPosts() {
    return this.prisma.post.findMany();
  }
}
