import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';

@Injectable()
export class MapService {

  constructor() { }


  initializeMap(Map) {
    if(!Map) { return null; }

    // create the map at the DOM element in this component
    let map = new Map(document.getElementById('map'), {
      center: [-1.5533600, 47.2172500],
      zoom: 8,
      basemap: 'topo-vector'
    });

    return map;
  }

  requestData(esriRequestService) {
    
    let Obs = new Observable(observer => {
      if(!esriRequestService) {
        observer.error({message: "Le service n'existe pas"});
      }

      const layerUrl = "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/layers";
      let layersRequest = esriRequestService({
        url: layerUrl,
        content: { f: "json" },
        handleAs: "json",
        callbackParamName: "callback"
      });

      console.log("layersRequest");

      layersRequest.then(
        (response) => {
          console.log("Success: ", response);
          observer.next(response.layers);
      }, (error) => {
          console.log("Error: ", error.message);
          observer.error(error);
      }).then(() => {
        console.log("completed\n");
        observer.complete();
      });
    });

    return Obs;
  }

}
