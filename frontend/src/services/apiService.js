import axios from 'axios';

const apiUrlPublic = process.env.NEXT_PUBLIC_API_URL;
const apiUrlProd = process.env.NEXT_PUBLIC_API_URL;

console.log(apiUrlPublic);
console.log(apiUrlProd);

if (!apiUrlProd) {
    console.warn('NEXT_PUBLIC_API_URL is not set! Falling back to localhost.');
}

const api = axios.create({
    baseURL: apiUrl || 'http://localhost:5050',
});

// Get all fighters
export const getFighters = async (skip, limit, sort, order) => {
    try {
        const response = await api.get('api/fighters', {
            params:
            {
                skip: skip,
                limit: limit,
                sort: sort,
                order: order
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching fighters:', error);
        throw error;
    }
};

// Function to fetch current Elo record by fighter name
export const getFightersByName = async (fighterName, skip, limit, sort, order) => {
    try {
        const response = await api.get('api/fighters/search', {
            params:
            {
                fighter_name: fighterName,
                skip: skip,
                limit: limit,
                sort: sort,
                order: order
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching fighter records:', error);
        throw error;
    }
};

// Get all fights
export const getFights = async () => {
    const response = await api.get('api/fights');
    return response.data;
};

// Get all events
export const getEvents = async (skip, limit, sort, order) => {
    try {
        const response = await api.get('api/events/', {
            params:
            {
                skip: skip,
                limit: limit,
                sort: sort,
                order: order
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

//Function to fetch Elo progression by fighter
export const getEloProgressionByFighter = async (fighterName, sort = 'asc') => {
    try {
        const response = await api.get('api/elo-records/search', {
            params: {
                fighter_name: fighterName,
                sort: sort,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Elo records:', error);
        throw error;
    }
}

// Legacy - Function to fetch Elo records by fighter name
export const getEloRecordsByFighter = async (fighterName, sort) => {
    try {
        const response = await api.get('api/elo-records/search', {
            params:
            {
                fighter_name: fighterName,
                sort: sort,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Elo records:', error);
        throw error;
    }
};
