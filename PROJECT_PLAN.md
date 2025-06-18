# MVP NBA Player Stat Analyzer - Project Plan & Progress Tracker

## 1. Project Goal (MVP)
To create a minimal viable product that allows a user to view a single player's mock season stats and determine how many times that player has exceeded a user-defined value for points, rebounds, or assists.

## 2. Key Features (MVP Breakdown)
- **F1: Mock Data Definition & Storage:** Define structure and create mock data for one player's full season.
- **F2: Player Season Stats Display:** Component to display game-by-game stats.
- **F3: Stat Comparison Input & Selection:** UI for user to input threshold and select stat type.
- **F4: Comparison Calculation Logic:** Function to calculate how many times the stat exceeds the threshold.
- **F5: Result Display:** Show the calculated count to the user.

## 3. Development Tasks

### Phase 1: Data Setup
- [ ] **T1: Define Data Structures**
    - Description: Create TypeScript interfaces for `GameStat` (opponent, points, rebounds, assists) and `PlayerSeason` (player info, array of `GameStat`).
    - Files to create/modify: `app/types/index.ts` (new file)
- [ ] **T2: Create Mock Data**
    - Description: Populate an array with mock `GameStat` objects for a full season (approx. 82 games). Store this in a dedicated file.
    - Files to create/modify: `app/data/mockPlayerData.ts` (new file)

### Phase 2: UI Components
- [ ] **T3: Develop Stats Display Component (`PlayerStatsView.tsx`)**
    - Description: Create a React component that takes the player's season data as a prop and renders a list/table of games, showing opponent, points, rebounds, and assists for each.
    - Files to create/modify: `app/components/PlayerStatsView.tsx` (new file), `app/page.tsx` (to integrate)
- [ ] **T4: Develop Input & Selection Component (`StatComparator.tsx`)**
    - Description: Create a React component that includes an input field for the numerical threshold and a mechanism (e.g., radio buttons/dropdown) to select "points," "rebounds," or "assists." It should manage its own state for these inputs and provide a way to communicate them to the parent.
    - Files to create/modify: `app/components/StatComparator.tsx` (new file), `app/page.tsx` (to integrate)

### Phase 3: Logic & Integration
- [ ] **T5: Implement Comparison Logic**
    - Description: Write a utility function that takes the mock season data, the selected stat type (points, rebounds, or assists), and the input threshold. It should filter the games where the player's selected stat exceeds the threshold and return the count.
    - Files to create/modify: `app/utils/statsHelper.ts` (new file)
- [ ] **T6: Integrate Components and Logic on Page (`app/page.tsx`)**
    - Description:
        - Import and use `PlayerStatsView` and `StatComparator` components.
        - Manage state for the selected stat type and threshold (lift state up from `StatComparator` or use a callback).
        - Pass mock data to `PlayerStatsView`.
        - Call the comparison logic from `statsHelper.ts` when inputs change or a "calculate" button is pressed.
        - Display the result from the comparison logic.
    - Files to create/modify: `app/page.tsx`
- [ ] **T7: Basic Styling**
    - Description: Apply minimal CSS for readability of the stats list, input fields, and results.
    - Files to create/modify: `app/globals.css`

## 4. MVP Success Criteria
- [ ] The application loads and displays the mock player's game-by-game season statistics.
- [ ] The user can input a numerical value.
- [ ] The user can select whether this value applies to points, rebounds, or assists.
- [ ] The application correctly calculates and displays the number of games in the season where the player exceeded the inputted value for the selected statistic.
- [ ] The application runs without crashing during these core operations.

## 5. Future Considerations (Post-MVP)
- Integration with a real-time NBA data API.
- Ability to select different players.
- Displaying team statistics.
- More advanced data visualization (charts, graphs).
- User accounts for saving preferences or favorite players/teams.
- Database integration for persistent data.
- Enhanced UI/UX, including responsive design and better styling.
- More robust error handling and input validation.
- Unit and integration tests.
