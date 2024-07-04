import mockAccountAPI from "./mockAccountAPI";
import mockCloudflareR2API from "./mockCloudflareR2API";
import mockImageAPI from "./mockImageAPI";
import mockScoreAPI from "./mockScoreAPI";
import mockUserAPI from "./mockUserAPI";

function mockAllAPI() {
  mockAccountAPI({});
  mockCloudflareR2API({});
  mockImageAPI({});
  mockScoreAPI({});
  mockUserAPI({});
}

export default mockAllAPI;
