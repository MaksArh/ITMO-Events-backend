import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from 'events/event.model';
import { CreateEventDto } from 'events/dto/create-event.dto';
import {EventData, EventRO} from "events/dto/event.ro";
import {UpdateEventDto} from "events/dto/update-event.dto";

@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Event) private readonly eventRepository: typeof Event
    ) {}

    private async _getEventModel(id: number): Promise<Event> {
        const event = await this.eventRepository.findByPk(id);
        if (!event) {
            throw new NotFoundException(`Event with ID "${id}" not found.`);
        }
        return event;
    }

    async fetchEvents(): Promise<EventRO[]> {
        const events = await this.eventRepository.findAll({ include: { all: true } });
        return events.map(event => this.buildEventRO(event));
    }

    async getEvent(id: number): Promise<EventRO> {
        const event = await this._getEventModel(id);
        return this.buildEventRO(event);
    }

    async createEvent(dto: CreateEventDto): Promise<EventRO> {
        const event = await this.eventRepository.create(dto);
        return this.buildEventRO(event);
    }

    async editEvent(updates: UpdateEventDto): Promise<EventRO> {
        const event = await this._getEventModel(updates.id);
        await event.update(updates.event);
        return this.buildEventRO(event);
    }

    async deleteEvent(id: number): Promise<void> {
        const event = await this._getEventModel(id);
        await event.destroy();
    }

    public buildEventRO(event: Event): EventRO {
        const eventData: EventData = { ...event.get({ plain: true }) };
        return { event: eventData };
    }
}
