import 'rxjs/add/operator/map';

import { Injectable, ElementRef } from '@angular/core';
import {bootstrap, dojoRequire, isLoaded} from 'esri-loader';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import { EsriLoaderService } from 'angular-esri-loader';

@Injectable()
export class MapService {

  private cred = 'useresri';

  constructor(public esriLoader: EsriLoaderService) {}

  loadCredentials(cookie: any, esriId: any) {

    let idJson;
    if (this.supports_local_storage()) {
      // read from local storage
      idJson = window.localStorage.getItem(this.cred);
      // console.log('loadCredentials localStorage idJson ', idJson);
    } else {
      // read from a cookie
      idJson = cookie(this.cred);
      // console.log('loadCredentials cookie idJson ', idJson);
    }

    if (idJson && idJson !== 'null' && idJson.length > 4) {
      const idObject = JSON.parse(idJson);
      // console.log('initialize esri ', idObject);
      esriId.initialize(idObject);
    } else {
      console.log('didn\'t find anything to load :(');
    }
  }

  storeCredentials(cookie: any, esriId: any) {
    // make sure there are some credentials to persist
    // console.log('user info', esriId);
    if (esriId.credentials.length === 0) {
      return;
    }

    // serialize the ID manager state to a string
    const idString = JSON.stringify(esriId.toJson());
    // store it client side
    if (this.supports_local_storage()) {
      // use local storage
      window.localStorage.setItem(this.cred, idString);
      // console.log('wrote to local storage');
    } else {
      // use a cookie
      cookie(this.cred, idString, {expires : 1});
      // console.log('wrote a cookie :-/');
    }
  }

  supports_local_storage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }

  initializeMap(elementName: string) {
    return new Promise((resolve: Function, reject: Function) => {
      this.esriLoader.loadModules([ 'esri/map', 'dojo/domReady!' ])
          .then(([ Map ]) => {

            const map = new Map(document.getElementById(elementName), {
              center : [ -1.5533600, 47.2172500 ],
              zoom : 8,
              basemap : 'streets'
            });

            resolve(map);
          })
          .catch((err) => {
            console.error('error init map', err);
            reject(err);
          });
    });
  }

  addScalebar(map: any) {
    return new Promise((resolve: Function, reject: Function) => {
      this.esriLoader.loadModules([ 'esri/dijit/Scalebar', 'dojo/domReady!' ])
          .then(([ Scalebar ]) => {

            const scalebar = new Scalebar({map : map, scalebarUnit : 'metric'});

            resolve(scalebar);
          });
    });
  }

  addLegend(map: any, response: any) {
    return new Promise((resolve: Function, reject: Function) => {
      this.esriLoader
          .loadModules(
              [ 'esri/arcgis/utils', 'esri/dijit/Legend', 'dojo/domReady!' ])
          .then(([ arcgisUtils, Legend ]) => {

            const legendLayers = arcgisUtils.getLegendLayers(response);
            const legendDijit =
                new Legend({map : map, layerInfos : legendLayers}, 'legend');

            // legendDijit.startup();
            resolve(legendDijit);

          });
    });
  }

  addDirections(map: any) {
    return new Promise((resolve: Function, reject: Function) => {
      this.esriLoader
          .loadModules([
            'esri/dijit/Directions', 'esri/dijit/Legend', 'dojo/domReady!'
          ])
          .then(([ Directions, Legend ]) => {

            const directions = new Directions({
              map : map
              // --------------------------------------------------------------------
              // New constuctor option and property showSaveButton added at
              // version 3.17 to allow saving route. For more information see
              // the API Reference.
              // https://developers.arcgis.com/javascript/3/jsapi/directions-amd.html#showsavebutton
              //
              // Uncomment the line below to add the save button to the
              // Directions widget
              // --------------------------------------------------------------------
              // , showSaveButton: true
            },
                                              'dir');

            // directions.startup();
            resolve(directions);

          });
    });
  }

  requestData() {

    const Obs = new Observable(observer => {

      this.esriLoader.loadModules([ 'esri/request', 'dojo/domReady!' ])
          .then(([ esriRequestService ]) => {

            const layerUrl =
                'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/layers';
            const layersRequest = esriRequestService({
              url : layerUrl,
              content : {f : 'json'},
              handleAs : 'json',
              callbackParamName : 'callback'
            });

            console.log('layersRequest');

            layersRequest
                .then(
                    (response) => {
                      console.log('Success: ', response);
                      observer.next(response.layers);
                    },
                    (error) => {
                      console.log('Error: ', error.message);
                      observer.error(error);
                    })
                .then(() => {
                  console.log('completed\n');
                  observer.complete();
                });

          });

    });

    return Obs;
  }
}
