import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { EsriLoaderService } from 'angular2-esri-loader';
import {  MapService } from './map.service';

@Component({
  selector: 'app-esri-map',
  providers: [EsriLoaderService, MapService],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class EsriMapComponent implements OnInit {
  //@ViewChild('map') mapEl: ElementRef;
  
  map: any;

  constructor(private esriLoader: EsriLoaderService, private mapService: MapService) { }

  ngOnInit() {
    // only load the ArcGIS API for JavaScript when this component is loaded
    return this.esriLoader.load({
      // use a specific version of the API instead of the latest
      url: '//js.arcgis.com/3.18/'
    }).then(() => {
      // load the map class needed to create a new map
      this.esriLoader.loadModules([
        'esri/map', 
        'esri/request',
        'esri/layers/ArcGISTiledMapServiceLayer', 
        'esri/layers/ArcGISDynamicMapServiceLayer', 
        'esri/config',
        'esri/geometry/Point',
        'dojo/domReady!'
        ])
        .then(([
          Map, 
          esriRequest,
          ArcGISTiledMapServiceLayer, 
          ArcGISDynamicMapServiceLayer,
          esriConfig,
          Point
        ]) => {
          // configuration esri

          /*

          esriConfig.defaults.workers.loaderConfig = {
            paths: {
              dojo: "https://ajax.googleapis.com/ajax/libs/dojo/1.11.2/dojo/"
            },
            packages: [{
              name: "primes",
              location: window.location.href.replace(/\/[^/]+$/, "/lib"),
              main: "primes"
            }],
            has: {
              "dojo-debug-messages": true
            }
          };
          */

          // init map
          this.map = this.mapService.initializeMap(Map);


          // Add Layers USA States
          let populationWorldLayer = "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer";
          let statesUSALayer = "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer";

          const basemap = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer");
          const populationLayer = new ArcGISDynamicMapServiceLayer(populationWorldLayer, {opacity: 0.5});
          const statesLayer= new ArcGISDynamicMapServiceLayer(statesUSALayer, {opacity: 0.7});

          this.map.addLayers([basemap, statesLayer, populationLayer]);

          //let usaCoords = new Point(-98.851003, 38.887611);
          //this.map.centerAndZoom(usaCoords, 3);

      });
    });
  }
}