import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { EsriLoaderService } from 'angular-esri-loader';
import {MapService} from './map.service';

@Component({
  selector : 'app-esri-map',
  providers : [ EsriLoaderService, MapService ],
  templateUrl : './map.component.html',
  styleUrls : [ './map.component.scss' ]
})
export class EsriMapComponent implements OnInit {

  // @ViewChild('map') mapEl: ElementRef;
  map: any;

  constructor(private esriLoader: EsriLoaderService,
              private mapService: MapService) {}

  ngOnInit() {

    const self = this;
    // only load the ArcGIS API for JavaScript when this component is loaded
    return this.esriLoader
        .load({
          // use a specific version of the API instead of the latest
          url : 'https://js.arcgis.com/3.20/'
        })
        .then(() => {
          // load the map class needed to create a new map
          this.esriLoader
              .loadModules([
                'dojo/cookie',
                'esri/IdentityManager',
                'dojo/_base/unload',
                'dojo/parser',
                'dojo/ready',
                'dijit/layout/BorderContainer',
                'dijit/layout/ContentPane',
                'dojo/domReady!',
              ])
              .then(([ cookie, esrId, baseUnload, parser, ready ]) => {

                // store credentials/serverInfos before the page unloads
                baseUnload.addOnUnload(this.mapService.storeCredentials(cookie, esrId));
                // look for credentials in local storage
                this.mapService.loadCredentials(cookie, esrId);

                ready(function() {

                  parser.parse();

                  self.mapService.initializeMap('exemple-map').then((map) => {
                    self.map = map;
                    self.mapService.addScalebar(map);
                    self.mapService.addDirections(map).then((directions: any) => {
                      // init directions traffic's apis
                      // with authentication's user
                      directions.startup().then((resp) => {
                          console.log('startup', resp);
                          if (resp === true) {
                            // store credentials user from esri's
                            // online
                            self.mapService.storeCredentials(cookie, esrId);
                          } else {
                            window.alert('You must to be authenticate from esri\'s web online\n\n' + resp);
                          }

                        }, (err) => {
                          console.error('error startup directions', err);
                          window.alert(err);
                        });
                      }, (err) => {
                        console.error('error addDirections ', err);
                      });
                  }, (err) => {
                    console.error('error initializeMap ', err);
                  });

                });

              });
        });
  }
}
