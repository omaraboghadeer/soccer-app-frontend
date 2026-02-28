import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationFromState } from '../../state/reservation-from.state';

@Component({
    selector: 'app-date-and-time',
    imports: [FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './date-and-time.component.html',
    host: {
        class: 'h-100'
    },
    styles: `
        input[type="checkbox"] ~ label {
            border-width: 2px !important;
            cursor: pointer;
        }
        input:checked {
            & ~ label {
                --selected-color: var(--pci-primary-500);
                border-color: var(--selected-color) !important;
                color: var(--selected-color) !important;
                border-width: 2px !important;;
            }
        }
    `
})
export class DateAndTimeComponent implements OnInit {
    public readonly _reservationState = inject(ReservationFromState);

    _today = new Date();
    formattedDay = signal(formatDateForInput(this._today));

    slots = signal(generateSlots("14:00", "24:00"));
    selectedSlots = signal<{ start: string, end: string }[]>([]);

    openMap() {
        const coordinates = {
            lat: 24.7136,
            lng: 46.6753
        };

        const googleMapURL =  `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
        window.open(googleMapURL, "_blank",  "noopener,noreferrer");
    }

    toggleSlotSelection(slot: { start: string, end: string }) {
        const currentSelection = this.selectedSlots();
        const index = currentSelection.findIndex(s => s.start === slot.start && s.end === slot.end);

        if (index !== -1) {
            this.selectedSlots.update(slots => {
                const updatedSlots = [...slots];
                updatedSlots.splice(index, 1);
                return updatedSlots;
            });
        } else {
            this.selectedSlots.update(slots => [...slots, slot]);
        }

        this._reservationState.selectedSlots.set(this.selectedSlots().map(s => `${s.start} - ${s.end}`));
    }

    onSelectDate(ev: Event) {
        this._reservationState.selectedDate.set((ev.target as any).value);
    }

    ngOnInit(): void { 
        this._reservationState.selectedDate.set(this._today);
    }
}


function generateSlots(start: string, end: string) {
    const slots = [];

    let current = parseTime(start);
    const endTime = parseTime(end);

    while (current < endTime) {
        const next = current + 60;

        slots.push({
            start: formatTime(current),
            end: formatTime(next)
        });

        current = next;
    }

    return slots;
}

function parseTime(time: string): number {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
}

function formatTime(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function formatDateForInput(date: Date): string {
    const local = new Date(date);
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toISOString().split('T')[0];
}