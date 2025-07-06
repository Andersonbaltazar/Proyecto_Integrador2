import React, { useEffect } from "react";
import { Chrono } from "react-chrono";
import { useCropTimelineStore } from "../../store/useTimelineStore";

const Timeline = ({ cultivoId }) => {
  const { timeline, fetchTimeline, loading, error } = useCropTimelineStore();

  useEffect(() => {
    if (cultivoId) {
      fetchTimeline(cultivoId);
    }
  }, [cultivoId]);

  if (loading) {
    return (
      <div className="timeline-loader-container">
        <div className="timeline-spinner"></div>
        <div>Cargando tu línea de tiempo...</div>
      </div>
    );
  }
  if (error) return <p>Error: {error}</p>;
  if (!timeline) return <p>No hay datos disponibles.</p>;

  return (
    <div className="w-full h-full" style={{ overflowX: "auto" }}>
      <Chrono
        items={timeline}
        mode="HORIZONTAL"
        disableToolbar
        hideControls={false}
      />
    </div>
  );
};

export default Timeline;
