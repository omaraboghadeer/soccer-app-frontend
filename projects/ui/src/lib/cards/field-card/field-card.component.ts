import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

type TFieldAction = "EDIT" | "CANCEL" | "DOWNLOAD";

@Component({
    selector: 'lib-field-card',
    imports: [DatePipe, NgTemplateOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './field-card.component.html',
    styles: ``,
})
export class FieldCardComponent {

    field_info = signal({
        ..._FIELD,
        bookingInfo: {
            booking_reference: "BK-2026-0002",
            date: "25-03-2026",
            time: "15:00",
            duration: 2,
            fieldSize: "5V5"
        },
        actions: (type: TFieldAction) => {
            switch (type) {
                case 'EDIT':
                    console.log('Edit:: Only Reschedule Date or Time');
                    break;
                case 'CANCEL':
                    console.log('Cancel:: will cancel the reservation');
                    break;
                case 'DOWNLOAD':
                    console.log('Donwload:: Download the ticket');
                break;
                default:
                    break;
            }
        } 
    });

    

    today = new Date();
    openMap() {
        const coordinates = {
            lat: 24.7136,
            lng: 46.6753
        };

        const googleMapURL =  `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
        window.open(googleMapURL, "_blank",  "noopener,noreferrer");
    }
}


const _FIELD = {
    "id": "1",
    "name": "Elite Field",
    "phone": "+966565000000",
    "address": {
        "governorate": {
            "id": "1",
            "name_ar": "القاهرة",
            "name_en": "Cairo"
        },
        "city": {
            "governorate_id": "1",
            "name_ar": "عزبة النخل",
            "name_en": "Ezbet el Nakhl",
            "id": "19"
        },
        "coordinates": {
            "lat": "30.1278",
            "long": "31.3292"
        }
    },
    "supportedSizes": [
        "5v5",
        "7v7"
    ],
    "price": 100,
    "workingStartHour": 16,
    "workingEndHour": 4,
    "ownerId": "aboghadeer"
};