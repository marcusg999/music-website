# Rock & Stone - WebGL Music Website

A fully functional, immersive music website featuring WebGL 3D graphics with a Rock/Mayan fusion aesthetic. Built entirely with client-side technologies (no backend required).

![Theme](https://img.shields.io/badge/Theme-Rock%2FMayan-8B4513)
![Tech](https://img.shields.io/badge/Tech-WebGL%20%7C%20Three.js-556B2F)
![Status](https://img.shields.io/badge/Status-Complete-CD853F)

## 🎨 Features

### 🌟 WebGL 3D Visual Experience
- **Three.js powered** immersive 3D background
- Mayan-inspired rotating glyphs and geometric shapes
- Dynamic particle system with earth-tone colors
- Atmospheric fog and lighting effects
- Fully responsive canvas that adapts to any screen size

### 🎵 Advanced Audio Player
- Custom HTML5 audio player with full controls
- **Real-time audio visualization** using Web Audio API
- Frequency bar visualization with earth-tone gradients
- Playlist management (play, pause, skip, delete)
- Volume control and progress tracking
- Persistent playback state

### 📤 Media Upload & Management
- **MP3 Upload**: Add your music files (up to 50MB each)
- **MP4 Upload**: Upload video content (up to 100MB each)
- Client-side storage using **IndexedDB**
- Visual media library with easy management
- Delete and organize your media files

### 📝 Content Management
- **Editable Bio Section**: Rich text editing with localStorage persistence
- **Events Management**: Add, edit, delete, and filter upcoming/past shows
- Calendar-style event cards with venue, location, and ticket links
- Filter events by upcoming, past, or all

### 🖼️ Gallery & UI
- Responsive photo gallery with grid layout
- Lightbox viewing experience
- Mayan glyph-inspired iconography throughout
- Earth-tone color palette (browns, terracottas, jade greens, obsidian blacks)

### 📱 Fully Responsive
- Mobile-first design approach
- Hamburger menu for mobile navigation
- Smooth scrolling between sections
- Touch-friendly controls
- Optimized for tablets and desktops

### 📧 Communication Features
- Newsletter signup form with email validation
- Contact form with client-side validation
- Social media integration (Spotify, YouTube, Instagram, Facebook)
- All form data stored in localStorage for demonstration

## 🎨 Color Palette (Earth Tones)

```css
Primary:    #8B4513  /* Saddle Brown */
Secondary:  #CD853F  /* Peru/Terracotta */
Accent:     #556B2F  /* Dark Olive Green/Jade */
Dark:       #2F2F2F  /* Obsidian */
Light:      #D2B48C  /* Tan/Stone */
Background: #1A1A1A  /* Very Dark Brown */
```

## 📁 File Structure

```
/
├── index.html              # Main HTML file with all sections
├── css/
│   ├── style.css          # Main styles with earth-tone theme
│   └── responsive.css     # Mobile/tablet responsive styles
├── js/
│   ├── main.js            # Navigation, forms, general functionality
│   ├── webgl-scene.js     # Three.js WebGL scene setup
│   ├── audio-player.js    # Audio player with visualization
│   ├── media-upload.js    # MP3/MP4 upload handler
│   ├── storage.js         # IndexedDB & localStorage management
│   └── events.js          # Events CRUD operations
├── assets/
│   ├── fonts/             # (Optional) Custom fonts
│   ├── textures/          # (Optional) 3D textures
│   └── icons/             # (Optional) Custom icons
└── README.md              # This file
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/marcusg999/music-website.git
   cd music-website
   ```

2. **Open in browser**:
   - Simply open `index.html` in a modern web browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js with http-server
     npx http-server -p 8000
     ```

3. **Visit**: `http://localhost:8000`

### Requirements
- Modern web browser with WebGL support (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- IndexedDB support for media storage

## 🌐 Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select branch (usually `main`) and root directory
4. Save and wait for deployment
5. Your site will be live at: `https://yourusername.github.io/music-website/`

### Other Hosting Options
- **Netlify**: Drag and drop the folder
- **Vercel**: Import from GitHub
- **Firebase Hosting**: Use Firebase CLI
- **Any static host**: Upload all files

## 💡 Usage Guide

### Uploading Music
1. Click "Upload Audio (MP3)" button
2. Select one or multiple MP3 files
3. Files are stored in IndexedDB
4. Play tracks from the playlist

### Uploading Videos
1. Click "Upload Video (MP4)" button
2. Select MP4 files
3. Click on video thumbnails to play

### Managing Events
1. Click "Add Event" button
2. Fill in date, venue, location, and optional ticket link
3. Events auto-filter into upcoming/past
4. Delete events with the delete button

### Editing Bio
1. Click into the bio text area
2. Edit content directly
3. Click "Save Bio" to persist changes

### Forms
- Newsletter and contact forms store data in localStorage
- Check browser console or localStorage to see submitted data

## 🛠️ Technologies Used

- **Three.js** (r128): WebGL 3D graphics library
- **Web Audio API**: Real-time audio analysis and visualization
- **IndexedDB API**: Client-side storage for media files
- **localStorage**: Persistent storage for text content
- **HTML5 Canvas**: Audio visualization rendering
- **CSS Grid & Flexbox**: Responsive layouts
- **CSS Custom Properties**: Dynamic theming
- **Vanilla JavaScript**: No frameworks, pure JS
- **Intersection Observer API**: Scroll animations

## 📊 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 60+     | ✅ Full |
| Firefox | 55+     | ✅ Full |
| Safari  | 11+     | ✅ Full |
| Edge    | 79+     | ✅ Full |

## 🎯 Performance Optimization

- Efficient WebGL rendering with requestAnimationFrame
- Lazy-loaded audio/video files
- Optimized particle system (1500 particles)
- Minimal DOM manipulation
- CSS transforms for smooth animations
- Blob URLs for media storage

## 🔧 Customization

### Changing Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --color-primary: #YourColor;
    --color-secondary: #YourColor;
    /* ... */
}
```

### Modifying WebGL Scene
Edit `js/webgl-scene.js`:
- Adjust particle count
- Change glyph geometries
- Modify lighting and fog

### Audio Visualizer
Customize in `js/audio-player.js`:
- Change FFT size for resolution
- Modify bar colors and gradients
- Adjust animation speed

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspiration: [beaslab.com](https://beaslab.com/home)
- Three.js community
- Web Audio API documentation
- Mayan cultural heritage for design inspiration

## 🐛 Known Issues

- Large media files (>100MB videos) may cause performance issues
- Safari may require user interaction before audio context initialization
- IndexedDB has browser-specific storage limits

## 🚧 Future Enhancements

- [ ] Service Worker for offline support
- [ ] PWA manifest for installability
- [ ] Additional audio visualizer types (waveform, circular)
- [ ] Image upload for gallery
- [ ] Export/import playlist feature
- [ ] Advanced audio effects (equalizer, reverb)

## 📧 Contact

For questions or suggestions, use the contact form on the website or open an issue on GitHub.

---

**Built with 🎵 and ◈ by the Rock & Stone team** 
