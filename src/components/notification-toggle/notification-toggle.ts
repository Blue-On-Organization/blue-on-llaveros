import { Component } from '@angular/core';
import { BackgroundMode, BackgroundModeConfiguration } from '@ionic-native/background-mode';
import { Storage } from '@ionic/storage';
import { BeaconStalkerProvider } from '../../providers/beacon-stalker/beacon-stalker';

@Component({
  selector: 'notification-toggle',
  templateUrl: 'notification-toggle.html'
})
export class NotificationToggleComponent {
  enabled: boolean;

  constructor(
    private backgroundMode: BackgroundMode,
    private storage: Storage,
    private stalker: BeaconStalkerProvider
  ) {
    this.storage.get('beacon-watching').then(enabled => enabled && this.on());

    backgroundMode.setDefaults({
      title: 'Monitor de dispositivos activo',
      text: 'Se te notificara cuando alguno de tus dispositivos este fuera de rango.'
    });
  }

  on() {
    this.storage.set('beacon-watching', true).then(()=>{
      this.enabled = true;
      this.backgroundMode.enable();
      this.backgroundMode.overrideBackButton();
      this.startMonitoring();
    });
  }

  off() {
    this.storage.set('beacon-watching', false).then(()=>{
      this.enabled = false;
      this.backgroundMode.disable();
    });
  }

  startMonitoring() {
    this.stalker.watch();
  }

}
