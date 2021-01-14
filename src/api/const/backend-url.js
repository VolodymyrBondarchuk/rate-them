export let config = {
  git: "https://api.github.com",
  repositories: "/repositories",
  //backendDev: "http://localhost:8080",
  backendDev: "http://ec2-52-15-92-138.us-east-2.compute.amazonaws.com:8080",
  addReviewUrl: "/api/review/add",
  getLastAddedReviewsUrl: "/api/review/getLastAdded/{page}/{amount}"
}
