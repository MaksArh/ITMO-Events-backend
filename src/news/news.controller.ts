import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {NewsService} from './news.service';
import {CreateNewsDto} from "news/dto/create-news.dto";
import {UpdateNewsDto} from "news/dto/update-news.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {NewsRO} from "news/dto/news.ro";

@ApiTags('Новости')
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @ApiOperation({ summary: 'Создание новости' })
    @ApiResponse({ status: 201, description: 'Новость успешно создана', type: NewsRO })
    @Post()
    async create(@Body() dto: CreateNewsDto): Promise<NewsRO> {
        return await this.newsService.create(dto);
    }

    @ApiOperation({ summary: 'Получение списка всех новостей' })
    @ApiResponse({ status: 200, description: 'Список новостей получен', type: [NewsRO] })
    @Get()
    async findAll(): Promise<NewsRO[]> {
        return await this.newsService.findAll();
    }

    @ApiOperation({ summary: 'Получение новости по ID' })
    @ApiResponse({ status: 200, description: 'Новость найдена', type: NewsRO })
    @ApiResponse({ status: 404, description: 'Новость не найдена' })
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<NewsRO> {
        return await this.newsService.findOne(+id);
    }

    @ApiOperation({ summary: 'Обновление новости по ID' })
    @ApiResponse({ status: 200, description: 'Новость обновлена', type: NewsRO })
    @ApiResponse({ status: 404, description: 'Новость для обновления не найдена' })
    @Put(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateNewsDto): Promise<NewsRO> {
        return await this.newsService.update(id, dto);
    }

    @ApiOperation({ summary: 'Удаление новости по ID' })
    @ApiResponse({ status: 200, description: 'Новость удалена' })
    @ApiResponse({ status: 404, description: 'Новость для удаления не найдена' })
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.newsService.remove(id);
    }
}
