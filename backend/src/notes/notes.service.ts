import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(Note)
        private readonly notesRepository: Repository<Note>,
    ){}
    create(title: string, content: string){
        const note = this.notesRepository.create({title, content})
        return this.notesRepository.save(note)
    }
    findAll(){
        return this.notesRepository.find({
            order: {createdAt: 'DESC'}
        })
    }

}
