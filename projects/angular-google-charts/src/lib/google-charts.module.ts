import { NgModule, Provider, LOCALE_ID, ModuleWithProviders } from '@angular/core';

import { ScriptLoaderService } from './script-loader/script-loader.service';
import { RawChartComponent } from './raw-chart/raw-chart.component';
import { GoogleChartComponent } from './google-chart/google-chart.component';
import { GOOGLE_API_KEY, CHART_VERSION } from './models/injection-tokens.model';

export const GOOGLE_CHARTS_PROVIDERS: Provider[] = [
  {
    provide: ScriptLoaderService,
    useFactory: setupScriptLoaderService,
    deps: [LOCALE_ID, GOOGLE_API_KEY, CHART_VERSION]
  }
];

@NgModule({
  providers: [ScriptLoaderService],
  declarations: [GoogleChartComponent, RawChartComponent],
  exports: [GoogleChartComponent, RawChartComponent]
})
export class GoogleChartsModule {
  public static forRoot(googleApiKey?: string, chartVersion?: string): ModuleWithProviders {
    return {
      ngModule: GoogleChartsModule,
      providers: [
        GOOGLE_CHARTS_PROVIDERS,
        { provide: GOOGLE_API_KEY, useValue: googleApiKey ? googleApiKey : '' },
        { provide: CHART_VERSION, useValue: chartVersion ? chartVersion : '46' }
      ]
    };
  }
}

export function setupScriptLoaderService(localeId: string, googleApiKey: string, chartVersion: string): ScriptLoaderService {
  return new ScriptLoaderService(localeId, googleApiKey, chartVersion);
}
