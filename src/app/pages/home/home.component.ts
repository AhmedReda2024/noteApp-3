import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { NotesService } from '../../core/services/notes/notes.service';
import { ToastrService } from 'ngx-toastr';
import { INotes } from '../../shared/interfaces/inotes';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly notesService = inject(NotesService);
  private readonly toastrService = inject(ToastrService);

  notesData: INotes[] = [];

  noteId!: string;

  myTitle: string = '';

  addNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });

  updateNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.getAllUserNotes();
  }

  getAllUserNotes(): void {
    this.notesService.getUserNotes().subscribe({
      next: (res) => {
        console.log(res.notes);
        this.notesData = res.notes;
      },
      error: (err) => {
        console.log(err);

        if (err.error.msg === 'not notes found') {
          this.notesData = [];
        }
      },
    });
  }

  submitAddNoteForm(): void {
    console.log(this.addNoteForm.value); // data:object ==> backend need it

    this.notesService.addNote(this.addNoteForm.value).subscribe({
      next: (res) => {
        console.log(res.note);
        this.addNoteForm.reset();
        this.getAllUserNotes(); // display again
        this.toastrService.success(res.msg, 'Notify Team');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setUpdateData(note: any, id: string): void {
    this.noteId = id;

    this.updateNoteForm.patchValue({
      title: note.title,
      content: note.content,
    });
  } // set data in the update form

  submitUpdateNoteForm(): void {
    this.notesService
      .updateNote(this.noteId, this.updateNoteForm.value)
      .subscribe({
        next: (res) => {
          console.log(res.note);
          this.updateNoteForm.reset();
          this.getAllUserNotes();
          this.toastrService.success(res.msg, 'Notify Team');
        },
        error: (err) => {
          console.log(err);
        },
      });
  } // update data

  deleteUserNotes(id: string): void {
    this.notesService.deleteNote(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllUserNotes();
        this.toastrService.success(res.msg, 'Notify Team');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
