import { Controller, Get, Post as HttpPost } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpPost('fetch')
  async fetchPosts() {
    return this.postsService.fetchAndStorePosts();
  }

  @Get()
  async getPosts() {
    return this.postsService.getAllPosts();
  }
}
