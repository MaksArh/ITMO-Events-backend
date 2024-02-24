import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Form } from 'forms/form.model';
import { type CreateFormDto } from 'forms/dto/create-form.dto';
import {UpdateFormDto} from "forms/dto/update-form.dto";
import {type FormRO, type FormData} from "forms/dto/forms.ro";

@Injectable()
export class FormsService {
    constructor (@InjectModel(Form) private readonly formRepository: typeof Form) {
    }

    async create(dto: CreateFormDto): Promise<FormRO> {
        const form = await this.formRepository.create(dto);
        return this.buildFormRO(form);
    }

    async getFormById(id: number): Promise<FormRO> {
        const form = await this.formRepository.findByPk(id);
        if (!form) {
            throw new NotFoundException(`Form with ID "${id}" not found.`);
        }
        return this.buildFormRO(form);
    }

    async fetch(): Promise<FormRO[]> {
        const forms = await this.formRepository.findAll();
        return forms.map(form => this.buildFormRO(form));
    }

    async update(id: number, updates: UpdateFormDto): Promise<FormRO> {
        const form = await this.formRepository.findByPk(id);
        if (!form) {
            throw new NotFoundException(`Form with ID "${id}" not found.`);
        }

        await form.update(updates);
        return this.buildFormRO(form);
    }

    async delete(id: number): Promise<void> {
        const form = await this.formRepository.findByPk(id);
        if (!form) {
            throw new NotFoundException(`Form with ID "${id}" not found.`);
        }

        await form.destroy();
    }



    public buildFormRO(form: Form): FormRO {
        const formData: FormData = {
            id:             form.id,
            userId:         form.userId,
            title:          form.title,
            description:    form.description,
            fields:         form.fields,
            events:         form.events,
        };
        return {form: formData} as FormRO;
    }
}
