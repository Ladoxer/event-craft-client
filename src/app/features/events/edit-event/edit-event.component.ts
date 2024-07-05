import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../core/services/event.service';
import { Event } from '../../../core/models/event.model';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css',
})
export class EditEventComponent implements OnInit {
  eventForm!: FormGroup;
  eventId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventId = this.route.snapshot.params['id'];
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.eventService.getEventById(this.eventId).subscribe({
      next: (event: Event) => {
        this.eventForm.patchValue({
          title: event.title,
          description: event.description,
          date: event.date,
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.eventService.updateEvent({...this.eventForm.value, id: this.eventId}).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
