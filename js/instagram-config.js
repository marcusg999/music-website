/**
 * Instagram Feed Configuration
 * 
 * SETUP OPTIONS:
 * 
 * Option 1: Use Juicer.io (Recommended - Easiest)
 * 1. Sign up at https://www.juicer.io
 * 2. Connect your Instagram account
 * 3. Get your feed ID
 * 4. Set method to 'juicer' and add feedId
 * 
 * Option 2: Instagram Basic Display API
 * 1. Create Facebook Developer App
 * 2. Set up Instagram Basic Display
 * 3. Generate access token
 * 4. Set method to 'official' and add accessToken
 * 
 * Option 3: Manual Posts (Admin Upload)
 * 1. Set method to 'manual'
 * 2. Admin can upload posts through admin panel
 */

window.instagramConfig = {
    // Integration method: 'juicer', 'official', or 'manual'
    method: 'juicer',
    
    // Instagram username (for display and links)
    username: 'beas',
    
    // Number of posts to display
    postsToShow: 9,
    
    // Juicer.io settings (if method = 'juicer')
    juicer: {
        feedId: 'YOUR_JUICER_FEED_ID', // Get from juicer.io dashboard
        feedName: 'beas' // Your feed name
    },
    
    // Official API settings (if method = 'official')
    official: {
        accessToken: 'YOUR_INSTAGRAM_ACCESS_TOKEN',
        userId: 'YOUR_INSTAGRAM_USER_ID'
    },
    
    // Feature toggle
    enabled: true,
    
    // Cache duration in minutes
    cacheDuration: 30
};
