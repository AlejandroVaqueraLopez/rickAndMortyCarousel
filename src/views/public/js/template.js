function createTemplate(characterName,characterStatus,characterSpecies,characterLocation){
    let template = `
        <!--carousel content-->
            <div class="carousel-content">
                <div id="characterImage" class="character-image"></div>
        <!--character info-->
                <div class="character-info">
                    <h2 id="char-name" class="char-name">${characterName}</h2>
                    <h6 class="lbl">Status:</h6>
                    <h5 class="char-status" id="char-status">${characterStatus}</h5>
                    <h6 class="lbl">Species:</h6>
                    <h5 id="char-species">${characterSpecies}</h5>
                    <h6 class="lbl">Last known location:</h6>
                    <h5 id="char-location">${characterLocation}</h5>
                    <h6 class="lbl">First seen in:</h6>
                    <h5 id="char-first-seen"></h5>
                </div>
            </div>
    `;
    return template;
}
export default createTemplate;
