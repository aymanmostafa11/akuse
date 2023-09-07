'use-strict'

const { ipcRenderer } = require('electron')
const Consumet = require('@consumet/extensions')
const AniListAPI = require('../modules/anilist/anilistApi')
const Frontend = require('../modules/frontend/frontend')
const clientData = require('../modules/clientData.js')

const anilist = new AniListAPI(clientData)
const frontend = new Frontend()

/**
 * OAuth is completed, so load the page with all the elements
 * 
 */
ipcRenderer.on('load-page-elements', async (event) => {
    const viewerId = await anilist.getViewerId()
    
    const viewerInfo = await anilist.getViewerInfo(viewerId)
    const entriesFeatured = await anilist.getTrendingAnimes()
    const entriesCurrent = await anilist.getViewerList(viewerId, 'CURRENT')
    const entriesTrending = await anilist.getTrendingAnimes()
    const entriesMostPopular = await anilist.getMostPopularAnimes()
    const entriesAdventure = await anilist.getAnimesByGenre("Adventure")
    const entriesComedy = await anilist.getAnimesByGenre("Comedy")
    const entriesFantasy = await anilist.getAnimesByGenre("Fantasy")
    const entriesHorror = await anilist.getAnimesByGenre("Horror")
    const entriesMusic = await anilist.getAnimesByGenre("Music")
    
    frontend.removeLoadingPage()

    frontend.displayViewerAvatar(viewerInfo)
    frontend.displayFeaturedAnime(entriesFeatured)
    frontend.displayUserAnimeSection(entriesCurrent, 'current', true)
    frontend.displayGenreAnimeSection(entriesTrending, 'trending')
    frontend.displayGenreAnimeSection(entriesMostPopular, 'most-popular')
    frontend.displayGenreAnimeSection(entriesAdventure, 'adventure')
    frontend.displayGenreAnimeSection(entriesComedy, 'comedy')
    frontend.displayGenreAnimeSection(entriesFantasy, 'fantasy')
    frontend.displayGenreAnimeSection(entriesHorror, 'horror')
    frontend.displayGenreAnimeSection(entriesMusic, 'music')
})
