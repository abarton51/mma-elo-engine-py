# MMA Elo Engine

## Updates

[02/05/2025]

- Only supports UFC fights as of now.
- Only GET API endpoints supported right now.
- Frontend is very much WIP.
- Currently working on frontend design and visualizations.
- TODO: See Issues

## Introduction

This project leverages the Elo rating system, traditionally used in chess, to evaluate fighters' performance based on head-to-head contests. By scraping data from various MMA organizations, we calculate Elo scores that provide a quantifiable measure of a fighter's skill level. This engine utilizes fast methods in scraping, storing, and processing data that scale well, providing an effective framework to build off of for Elo ranking systems for other competitive endeavors such as tennis, BJJ, 1v1 esports, fencing, etc.

## Understanding Elo Ratings

### What is Elo?

Elo is a rating system used to calculate the relative skill levels of players in two-player games such as chess, and in some cases, in combat sports like MMA. It provides a way to rank competitors based on their performance against one another.

#### Mathematical Definition

The Elo rating system calculates a player’s new rating based on the following formula:

$$
R_{new} = R_{current} + k (S - E_{S})
$$

Where:

- $R_{new} :=$ New rating
- $R_{current} :=$ Current rating
- $k :=$ DevElopment coefficient (a constant that determines how much a player's rating can change after each match)
- $S :=$ Actual score (1 for a win, 0 for a loss, and 0.5 for a draw)
- $E_{S} :=$ Expected score, calculated using the following formula:

$$
E_{S} = \frac{1}{1 + 10^{(R_{opponent} - R_{current}) / 400}}
$$

- $R_{opponent}:=$ Rating of the opponent

#### Intuitive Understanding

To understand Elo intuitively, think of it as a way to gauge a player's skill relative to their opponents. When a player wins against a higher-rated opponent, their rating increases significantly because it indicates a strong performance. Conversely, if a lower-rated player loses to a higher-rated one, their rating decreases less dramatically.

For example, if Fighter A (rated 1400) beats Fighter B (rated 1600), Fighter A’s rating will increase significantly, while Fighter B’s will decrease significantly. However if Fighter B were to beat Fighter A, then their ELOs would still change, but less dramatically since this is result is closer to the estimated expected outcome.

## Data Flow Diagram

```mermaid
flowchart TD

    subgraph Websites
        W1[UFC Public Stats]
    end

    subgraph Backend
        A1[Scrapy Spiders] --> W1
        W1 --> A2[Item Pipelines]
        A3[Elo Engine]
        A4[API Endpoints]
        click A1 "Scrapy Spiders regularly crawl MMA websites for fighter data."
        click A2 "Pipelines process and store the fighter data into the database."
        click A3 "Elo engine processes data in database and updates Elo scores."
        click A4 "APIs provide access to database via CRUD operations."
    end

    subgraph Database
        B1[(PostgreSQL Database)]
        click B1 "PostgreSQL database stores and handles fighter data and Elo scores."
    end

    subgraph Frontend
        E1[React Website w/ Interactive Charts and Graphs] --> A4
        click E1 "Provides UI for interacting with Backend API."
        click E1 "Data is displayed in a React-based frontend."
    end

    A2 --> B1
    A3 --> B1
    A4 --> B1

    classDef blue fill:#B3E5FC,stroke:#0288D1,stroke-width:2px;
    classDef green fill:#C8E6C9,stroke:#388E3C,stroke-width:2px;
    classDef orange fill:#FFE0B2,stroke:#F57C00,stroke-width:2px;
    classDef purple fill:#E1BEE7,stroke:#8E24AA,stroke-width:2px;
    classDef lightgreen fill:#DCEDC8,stroke:#689F38,stroke-width:2px;
    classDef red fill:#FFCDD2,stroke:#F44336,stroke-width:2px;
    classDef yellow fill:#FFF9C4,stroke:#FFEB3B,stroke-width:2px;

    class A1 red;
    class A2 blue;
    class B1 green;
    class A3 orange;
    class A4 purple;
    class E1 yellow;
```

## Technical Overview

### Technology Stack

- **Database**: [PostgreSQL](https://www.postgresql.org/) is used to store fighter data, fight results, and calculated Elo scores.
- **Web Scraping**: Utilizes the fast Python scraping framework [Scrapy](https://scrapy.org/) to gather data.
- **Elo Engine**: Elo engine Python package calculates Elo statistics and updates Elo ratings and history in database.
- **API Development**: [FastAPI](https://fastapi.tiangolo.com/) is employed to create a high-performance API.
- **Frontend**: [Node.js](https://nodejs.org/en) for the frontend package manager and runtime environment.
- **Web Development Framework**: [React.js](https://react.dev/) for frontend web development framework.

### Architecture

The project is structured in a very simple full stack fashion:

1. **Database**: Stores and handles the data.
2. **Backend**: Houses the web scraper, Elo engine package, CRUD operations, and API endpoints.
3. **Frontend**: Access backend API endpoints and providing a UI.

## Data Flow

The data flow in this project can be summarized as follows:

1. **Scraping**: The backend utilizes Scrapy to scrape data from various MMA-related websites (currently only UFC). The data collected includes information about fighters, fights, events, and initializes Elo ratings for each fighter to 1000.

2. **Processing**: After the data is scraped, it is processed and cleaned to ensure it adheres to the required schema through the Item Pipeline in Scrapy.

3. **Storing**: The processed data is then stored in a PostgreSQL database named `mma_elo_db`, which consists of the following tables:
   - **`fighters`**: Contains information about each fighter.
   - **`fights`**: Records details about each fight, including the fighters involved and the result.
   - **`events`**: Details about the events where the fights take place.
   - **`elo_records`**: Elo rating history for each fighter.

4. **API Interaction**: The backend exposes API endpoints that allow users to query the database and retrieve information about fighters, fights, events, and elo ratings. Users can perform actions such as:
   - Fetching fighter statistics.
   - Retrieving fight history.
   - Retrieving Elo history.
   - Accessing event details.

## Build and Deploy

In root directory:

```
docker compose up
```

If this is first time building and deploying, then you need to web scrape and run the Elo calculator. After the first time, this data is cached by docker, even after pruning the system and removing images. See `backend/README.md` for information on scraping and Elo score updating.

## Disclaimer

Disclaimer: This is a _personal side project_ that I do for _fun_ and to _learn_ :neckbeard:.

