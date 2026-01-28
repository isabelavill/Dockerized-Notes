import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotesService } from './notes.service';
import { createNoteDto } from './dto/create-note.dto';


@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService){}

    @Post()
    create(@Body() dto: createNoteDto){
        return this.notesService.create(dto.title, dto.content)
    }
    @Get()
    findAll(){
        return this.notesService.findAll()
    }
}
