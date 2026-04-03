import { ChangeDetectionStrategy, Component, OnInit, output, viewChild } from '@angular/core';
import { GoogleMapsModule, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';

@Component({
    selector: 'lib-map',
    imports: [GoogleMapsModule],
    template: `
        <!-- <button class="btn btn-primary m-2" (click)="currentLocation()">
            Current Location
        </button> -->
        <google-map 
            height="400px"
            width="100%"
            [center]="center"
            [zoom]="zoom"
            [options]="mapOptions">
            
            <map-advanced-marker
                #markerElem="mapAdvancedMarker"
                [position]="markerPosition"
                [options]="markerOptions"
                (mapDragend)="onDragEnd($event, markerElem)">
            </map-advanced-marker>
        </google-map>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {

    locationChange = output<google.maps.LatLngLiteral>();
    protected readonly infoWindow = viewChild(MapInfoWindow);

    center: google.maps.LatLngLiteral = { lat: 24.7136, lng: 46.6753 };
    markerPosition: google.maps.LatLngLiteral = { lat: 24.7136, lng: 46.6753 };
    zoom = 18;

    // IMPORTANT: Advanced Markers require a Map ID
    mapOptions: google.maps.MapOptions = {
        mapId: 'c4005058b419593ab8ece2d0',
        controlSize: 25
    };

    markerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
        gmpDraggable: true,
        title: 'Drag me'
    };

    ngOnInit(): void {
        this.currentLocation();
    }

    onDragEnd(event: google.maps.MapMouseEvent, marker: MapAdvancedMarker) {
        if (event.latLng) {
            const newPos = event.latLng.toJSON();
            this.markerPosition = newPos;

            this.infoWindow()?.open(marker);
            this.locationChange.emit(newPos);
        }
    }

    currentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = { lat: position.coords.latitude, lng: position.coords.longitude };
                    this.center = pos;
                    this.markerPosition = pos;

                    this.locationChange.emit(pos);
                },
                () => {
                    alert("Error: The Geolocation service failed.");
                }
            );
        } else {
            alert("Error: Your browser doesn't support geolocation.");
        }
    }
}


