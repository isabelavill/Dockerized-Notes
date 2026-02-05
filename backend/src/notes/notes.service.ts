import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(Note)
        private readonly notesRepository: Repository<Note>,
    ){}
    async create(dto: CreateNoteDto){
        const note = this.notesRepository.create(dto)
        return this.notesRepository.save(note)
    }
    findAll(){
        return this.notesRepository.find({
            order: {createdAt: 'DESC'}
        })
    }
    async findOne(id:string){
        const note = await this.notesRepository.findOne({ where: {id}});
        if (!note){
            throw new NotFoundException('Note not found');
        }
        return note;
    }
    async remove(id: string){
        const result = await this.notesRepository.delete(id);
        if (result.affected === 0){
            throw new NotFoundException('Note not found');
        }
    }

}
