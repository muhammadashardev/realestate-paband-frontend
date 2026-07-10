const stableHash = (value) => {
  let hash = 0;
  const text = String(value || '').trim();
  for (let i = 0; i < text.length; i += 1) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const buildBusinessId = (prefix, rawId) => {
  const cleaned = String(rawId || '').trim();
  if (!cleaned) return `${prefix}-000`;
  if (cleaned.startsWith(prefix)) return cleaned;
  const hash = stableHash(cleaned);
  return `${prefix}-${String(hash % 1000).padStart(3, '0')}`;
};

export const getPropertyRouteId = (property) => property?.propertyId || buildBusinessId('OP', property?.id || property?._id || property?.propertyId);
export const getPropertyDisplayId = (property) => {
  if (!property) return 'OP-000';
  return property?.propertyId || buildBusinessId('OP', property?.id || property?._id || property?.propertyId);
};

export const getVisitRouteId = (visit) => visit?.visitId || visit?.requestId || buildBusinessId('VIS', visit?.id || visit?._id || visit?.routeId);
export const getVisitDisplayId = (visit) => {
  if (!visit) return 'VIS-000';
  return visit?.visitId || visit?.requestId || buildBusinessId('VIS', visit?.id || visit?._id || visit?.routeId);
};

export const getVisitBackendId = (visit) => visit?._id || visit?.id || visit?.backendId || visit?.visitId || visit?.requestId;
