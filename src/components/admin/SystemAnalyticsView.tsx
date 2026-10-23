import React from 'react';

export const SystemAnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-outline-variant gap-4">
        <div>
          <h2 className="text-headline-md font-bold text-on-surface">Directorate Security Analytics</h2>
          <p className="text-body-sm text-on-surface-variant">
            Aggregated campus safety metrics, response velocity, and quarterly resolution indicators.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-label-sm text-outline">REPORTING PERIOD:</span>
          <span className="px-3 py-1 bg-surface-container-low rounded-lg font-bold text-xs text-primary border border-outline-variant">
            Academic Session 2024/2025
          </span>
        </div>
      </div>

      {/* Top Aggregates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/60 shadow-xs">
          <div className="text-label-sm text-outline uppercase font-bold">Total Dockets Logged</div>
          <div className="text-display-lg font-bold text-on-surface mt-1">107</div>
          <div className="text-xs text-tertiary mt-2 font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">trending_down</span>
            <span>-8.4% vs previous semester</span>
          </div>
        </div>

        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/60 shadow-xs">
          <div className="text-label-sm text-outline uppercase font-bold">Avg Tactical Response</div>
          <div className="text-display-lg font-bold text-primary mt-1">4.2 min</div>
          <div className="text-xs text-tertiary mt-2 font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">bolt</span>
            <span>Target: &lt; 7.0 minutes</span>
          </div>
        </div>

        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/60 shadow-xs">
          <div className="text-label-sm text-outline uppercase font-bold">Investigation Clearance</div>
          <div className="text-display-lg font-bold text-tertiary mt-1">94.2%</div>
          <div className="text-xs text-on-surface-variant mt-2 font-medium">86 cases closed with formal finding</div>
        </div>

        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/60 shadow-xs">
          <div className="text-label-sm text-outline uppercase font-bold">Anonymous Discretion</div>
          <div className="text-display-lg font-bold text-on-surface mt-1">62.8%</div>
          <div className="text-xs text-outline mt-2">Zero identity disclosure incidents</div>
        </div>
      </div>

      {/* Location Hotspots Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/60 shadow-xs space-y-4">
          <h3 className="text-title-md font-bold text-on-surface">Campus Location Density</h3>
          <div className="space-y-3 text-body-sm">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-on-surface">Hostels Quadrangle (Male &amp; Female)</span>
                <span className="font-bold text-primary">34 Incidents (32%)</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{ width: '32%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-on-surface">Faculty of Computing &amp; Sciences</span>
                <span className="font-bold text-primary">28 Incidents (26%)</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{ width: '26%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-on-surface">Main Gate &amp; Perimeter Boundaries</span>
                <span className="font-bold text-primary">25 Incidents (23%)</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{ width: '23%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-on-surface">Take-off Campus (Akunza Site)</span>
                <span className="font-bold text-tertiary">20 Incidents (19%)</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full" style={{ width: '19%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant/60 shadow-xs space-y-4">
          <h3 className="text-title-md font-bold text-on-surface">Time-of-Day Risk Distribution</h3>
          <p className="text-body-sm text-on-surface-variant">
            Peak reporting occurs during evening shift change (20:00 - 23:00) and laboratory break windows (10:00 - 12:00).
          </p>

          <div className="grid grid-cols-4 gap-3 pt-3 text-center">
            <div className="p-3 bg-surface-container-low rounded-lg">
              <span className="text-xs text-outline block">Morning (06-12)</span>
              <span className="text-xl font-bold text-on-surface mt-1 block">35%</span>
              <span className="text-[10px] text-primary">Theft &amp; Lost items</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-lg">
              <span className="text-xs text-outline block">Afternoon (12-18)</span>
              <span className="text-xl font-bold text-on-surface mt-1 block">22%</span>
              <span className="text-[10px] text-primary">Disputes</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-lg border-2 border-error/30">
              <span className="text-xs text-error font-bold block">Night (18-24)</span>
              <span className="text-xl font-bold text-error mt-1 block">33%</span>
              <span className="text-[10px] text-error">Perimeter / Noise</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-lg">
              <span className="text-xs text-outline block">Graveyard (00-06)</span>
              <span className="text-xl font-bold text-on-surface mt-1 block">10%</span>
              <span className="text-[10px] text-tertiary">Trespass</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
