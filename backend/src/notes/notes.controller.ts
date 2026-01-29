import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
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
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.notesService.findOne(id)
    }
    @Delete(':id')
    remove(@Param('id') id:string){
        return this.notesService.remove(id)
    }
}
