export const stadiumZones = [
    { id: "A1", name: "VIP Lounge", capacity: 500, currentOccupancy: 320, color: "#7C3AED" },
    { id: "A2", name: "East Stand", capacity: 5000, currentOccupancy: 4200, color: "#00E5FF" },
    { id: "A3", name: "West Stand", capacity: 5000, currentOccupancy: 3800, color: "#10B981" },
    { id: "B1", name: "North Terrace", capacity: 8000, currentOccupancy: 7200, color: "#F59E0B" },
    { id: "B2", name: "South Terrace", capacity: 8000, currentOccupancy: 6500, color: "#FF6B35" },
    { id: "C1", name: "Family Zone", capacity: 3000, currentOccupancy: 2100, color: "#EC4899" },
    { id: "C2", name: "Fan Zone", capacity: 4000, currentOccupancy: 3800, color: "#EF4444" },
    { id: "D1", name: "Concourse East", capacity: 2000, currentOccupancy: 1500, color: "#8B5CF6" },
    { id: "D2", name: "Concourse West", capacity: 2000, currentOccupancy: 1800, color: "#06B6D4" },
];

export const amenities = [
    { id: "am1", name: "Main Gate A", type: "entrance", location: "North", status: "open" },
    { id: "am2", name: "Main Gate B", type: "entrance", location: "South", status: "open" },
    { id: "am3", name: "VIP Entrance", type: "entrance", location: "East", status: "open" },
    { id: "am4", name: "Parking Lot A", type: "parking", location: "North-East", spots: 500, available: 120 },
    { id: "am5", name: "Parking Lot B", type: "parking", location: "South-West", spots: 300, available: 45 },
    { id: "am6", name: "First Aid Station 1", type: "medical", location: "East Concourse", status: "active" },
    { id: "am7", name: "First Aid Station 2", type: "medical", location: "West Concourse", status: "active" },
    { id: "am8", name: "Lost & Found", type: "service", location: "Main Concourse", status: "open" },
    { id: "am9", name: "Information Desk", type: "service", location: "Gate A", status: "open" },
    { id: "am10", name: "Accessible Seating Area", type: "accessibility", location: "Section C1", capacity: 200 },
];

export const exitRoutes = [
    { id: "exit1", name: "North Exit → Metro Station", estimatedTime: 8, crowdLevel: "high", transport: "Metro" },
    { id: "exit2", name: "South Exit → Bus Terminal", estimatedTime: 12, crowdLevel: "medium", transport: "Bus" },
    { id: "exit3", name: "East Exit → Parking Lot A", estimatedTime: 5, crowdLevel: "low", transport: "Car" },
    { id: "exit4", name: "West Exit → Taxi Stand", estimatedTime: 10, crowdLevel: "high", transport: "Taxi" },
    { id: "exit5", name: "Gate C → Ride Share Zone", estimatedTime: 7, crowdLevel: "medium", transport: "RideShare" },
];