# Escalation Dashboard

An interactive dashboard for monitoring and analyzing escalation data with real-time charts, filters, and export functionality.

## Features

✨ **Interactive Visualizations**
- Bar charts showing top team members
- Line charts for time-based trends
- Pie charts for distribution analysis

🔍 **Advanced Filtering**
- Search by email/team member
- Filter by time buckets
- Real-time data updates

📊 **Data Management**
- Upload CSV files
- Sortable data tables
- Export to CSV or JSON

📱 **Responsive Design**
- Works on desktop, tablet, and mobile
- Beautiful gradient UI
- Smooth animations

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
git clone https://github.com/adarshtiwari1vc-code/escalation-dashboard.git
cd escalation-dashboard
npm install
```

### Running the Dashboard

```bash
npm start
```

The dashboard will open at `http://localhost:3000`

## Data Format

Your CSV file should have the following format:

```csv
email,days,count
john.doe@company.com,0 days,10
john.doe@company.com,1 day,5
jane.smith@company.com,0 days,20
```

## Technologies Used

- **React 18** - UI framework
- **Recharts** - Data visualization
- **CSS3** - Styling with gradients and animations

## Features Breakdown

### Statistics Cards
Displays key metrics:
- Total team members
- Total escalations
- Average per member
- Highest count

### Charts
- **Bar Chart**: Top 10 team members by escalation count
- **Line Chart**: Escalation trends by time buckets
- **Pie Chart**: Distribution breakdown

### Filters
- Search by email
- Filter by time bucket
- Clear all filters

### Data Table
- Sortable columns
- Color-coded values
- Responsive design

### Export
- CSV export
- JSON export
- Auto-dated filenames

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## License

MIT License - feel free to use this project for your needs!
