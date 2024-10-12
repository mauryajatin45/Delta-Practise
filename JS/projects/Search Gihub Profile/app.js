let input = document.getElementById('txt');
let search = document.querySelector("#search");
let avatar = document.querySelector("#avatar");
let FollowersCount = document.querySelector("#FollowersCount");
let FollowingCount = document.querySelector("#FollowingCount");
let RepositoryCount = document.querySelector("#RepositoryCount");
let Name = document.querySelector("#Name");
let showProfile = document.querySelector(".showProfile");
let url = "https://api.github.com/users/";

search.addEventListener('click', async () => {
    let data = await axios.get(`${url}${input.value}`);
    showProfile.style.display = 'block';

    let name = data.data.name;
    let image = data.data.avatar_url;
    let followers = data.data.followers;
    let following = data.data.following;
    let public_repos = data.data.public_repos;

    avatar.src = image;

    FollowersCount.innerText = followers;
    FollowingCount.innerText = following;
    RepositoryCount.innerText = public_repos;
    Name.innerText = name;
})