# Testing Real-Time Updates

## How to Test

The real-time preview should be working on the `/create` page. Here's how to test it:

### 1. Open the Create Page

```
http://localhost:3000/create
```

You should see:
- **Left side**: Form with 4 tabs (Details, Tickets, Theme, Features)
- **Right side**: Live preview panel with "Live Preview" header

### 2. Test Event Title (Should update instantly)

1. Click in the "Event Title" field
2. Type: `Summer Music Festival`
3. **Watch the right panel** - The title should appear immediately in the preview

### 3. Test Description (Should update instantly)

1. Click in the "Description" textarea
2. Type: `Join us for an amazing summer experience`
3. **Watch the right panel** - Description should appear in real-time

### 4. Test Theme Colors (Should update instantly)

1. Click the "Theme" tab
2. Click on a preset theme button (Vibrant, Ocean, Sunset, Forest, or Neon)
3. **Watch the right panel** - The entire preview should change colors immediately

### 5. Test Custom Colors (Should update instantly)

1. Stay in the "Theme" tab
2. Click the color picker next to "Primary Color"
3. Choose a different color
4. **Watch the right panel** - Headers and main elements should change color

### 6. Test Layout Change (Should update instantly)

1. Stay in the "Theme" tab
2. Click different layout buttons (Single, Two Column, Card, Minimal)
3. **Watch the right panel** - The entire layout should switch immediately

### 7. Test Ticket Addition (Should update instantly)

1. Click the "Tickets" tab
2. Click "+ Add Tier" button
3. Change the ticket name to "VIP Pass"
4. Change the price to `50`
5. **Watch the right panel** - Ticket should appear with your theme colors

## Troubleshooting

If updates aren't working:

### Check 1: Browser Console
1. Open browser DevTools (F12 or Cmd+Option+I)
2. Look for any red errors in the Console tab
3. If you see errors, share them

### Check 2: Hard Refresh
1. Press **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows)
2. This clears the browser cache
3. Try typing again

### Check 3: Dev Server Running
```bash
# Check if server is running
curl http://localhost:3000/create
```

Should return HTML, not an error.

### Check 4: Port Already in Use
If another app is using port 3000:
```bash
# Kill existing Next.js processes
pkill -f "next dev"

# Restart
npm run dev
```

### Check 5: React State
The preview updates whenever you:
- Type in any input field
- Click color pickers
- Change dropdowns
- Click theme presets
- Add/remove tickets

**Note**: The updates happen **as you type**, not on blur or Enter. If you're clicking outside the input after typing, the update should already have happened.

## Expected Behavior

### What Updates Instantly:
✅ Event title
✅ Description
✅ Date and time
✅ Venue and location
✅ Theme colors (all 5)
✅ Font style
✅ Layout style
✅ Gradient toggle
✅ Gradient direction
✅ Ticket tiers
✅ Ticket prices

### What Doesn't Update (by design):
❌ Images (not implemented yet)
❌ Gallery (placeholder)
❌ Chat (placeholder)

## Technical Details

The app uses React `useState` hooks:

```typescript
const [eventData, setEventData] = useState<Partial<Event>>({ ... });

// Every input calls:
onChange={(e) => updateEvent({ title: e.target.value })}

// Which updates state:
const updateEvent = (updates) => {
  setEventData(prev => ({ ...prev, ...updates }));
};

// Which triggers re-render of EventPreview component:
<EventPreview event={eventData} />
```

This is standard React behavior and should work out of the box.

## Still Not Working?

If you're absolutely sure it's not updating:

1. **Share what you're doing** - Which field? Which tab?
2. **Share browser console errors** - Any red text?
3. **Share dev server logs** - Run `cat /tmp/nextjs-dev.log`
4. **Try a different browser** - Chrome vs Firefox vs Safari

The code is correct and should work. Most issues are:
- Browser cache (hard refresh fixes)
- Dev server not running (restart fixes)
- Looking at wrong panel (right panel is preview)
