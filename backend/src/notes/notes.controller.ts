import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { NotesService } from './notes.service';
import { createNoteDto } from './dto/create-note.dto';


@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService){}

    @Post()
    @HttpCode(HttpStatus.CREATED) //201
    create(@Body() dto: createNoteDto){
        return this.notesService.create(dto)
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
    @HttpCode(HttpStatus.NO_CONTENT)  //204
    remove(@Param('id') id:string){
        return this.notesService.remove(id)
    }
}
