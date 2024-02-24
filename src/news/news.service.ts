import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from './news.model';
import {CreateNewsDto} from "news/dto/create-news.dto";
import {UpdateNewsDto} from "news/dto/update-news.dto";
import {type NewsData,type NewsRO} from "news/dto/news.ro";

@Injectable()
export class NewsService {
    constructor(@InjectModel(News) private readonly newsRepository: typeof News) {}

    async create(dto: CreateNewsDto): Promise<NewsRO> {
        const news = await this.newsRepository.create(dto);
        return this.buildNewsRO(news);
    }

    async findAll(): Promise<NewsRO[]> {
        const news = await this.newsRepository.findAll();
        return news.map(news => this.buildNewsRO(news));
    }

    async findOne(id: number): Promise<NewsRO> {
        const news = await this.newsRepository.findByPk(id);
        if (!news) {
            throw new NotFoundException(`News with ID "${id}" not found`);
        }
        return this.buildNewsRO(news);
    }

    async update(id: number, dto: UpdateNewsDto): Promise<NewsRO> {
        const news = await this.newsRepository.findByPk(id);
        if (!news) {
            throw new NotFoundException(`News with ID "${id}" not found`);
        }
        await news.update(dto);
        return this.buildNewsRO(news);
    }

    async remove(id: number): Promise<void> {
        const news = await this.newsRepository.findByPk(id);
        if (!news) {
            throw new NotFoundException(`News with ID "${id}" not found`);
        }
        await news.destroy();
    }

    private buildNewsRO(news: News): NewsRO {
        const newsData: NewsData = {
            id:         news.id,
            title:      news.title,
            content:    news.content,
            imageURL:   news.imageURL,
        };
        return {news: newsData} as NewsRO;
    }
}
