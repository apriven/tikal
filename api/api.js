class ShowsAPI {
    url = 'http://api.tvmaze.com/search/shows?q='
    cache = {};

    fetching = false;
    async fetchData(query) {
        if (this.fetching){
            throw Error ("error")
        }
        this.fetching = true;
        if (this.cache[query]){
            return this.cache[query]
        }

        const response = await fetch(this.url + query);
        const data = await response.json();
        const transformed = data.map(item => {
            const { show } = item;
            return {
                id: show.id,
                title: show.name,
                description: show.summary,
                score: item.score,
            };

        });
        console.log('transformed', transformed);
        this.cache[query] = transformed;
        this.fetching = false;
        return transformed
    }
}

const api = new ShowsAPI();
api.fetchData("anarchy")