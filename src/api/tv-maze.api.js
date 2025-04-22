export default class TvMazeApi {
    static baseUrl = "http://localhost:5000/api";
  
    static async searchShows(query) {
      const response = await fetch(`${this.baseUrl}/search/shows?q=${query}`,
        {
          method: 'GET', // You can change to 'POST' if needed
          headers: {
            'Authorization': token,  // Add your token or any other authentication data
            'Content-Type': 'application/json',  // Set content type to JSON if necessary
          }
        }
      );
      const data = await response.json();
      return data.map((item) => item.show);
    }
  
    static async getShowDetails(id) {
      const response = await fetch(`${this.baseUrl}/show/${id}`);
      const data = await response.json();
      return data;
    }
  
    static async getAllShows() {
      const response = await fetch(`${this.baseUrl}/show`);
      const data = await response.json();
      return data;
    }
  }
  