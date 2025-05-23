export const common = {
  mineCA: '0x6de7f37919efbeff86b9c522c780b2271ba79bcca7fc0b1cfffc98d8aeb6d500',
  sharesCA: '0xab8b10ddcc3128ed96b53f4262f122e8e1865891edc90f301f4991e3701c7e59',
  huskiCA: '0x07577ffb6957bbff6f90d3d42a1f5d17618e070f48be73a9545fa972c2159204',

  contractAddress: '0x6de7f37919efbeff86b9c522c780b2271ba79bcca7fc0b1cfffc98d8aeb6d500',
  upgradeCap: '0x7564eb225d9f6e106af8c261257d53534bc6e61a531cddcf0598647485938e2e',

  publisherMine: '0x959e17c23465e06179823f6db82ab57d368d24aca53f194888aef2b4067db80a',
  publisherSuichat: '0x263d96d86035610ac6e3be9e7df5b7b2b08d1c93508197a0f0d9aea200f6649d',
  publisherProfile: '',

  treasuryCapHUSKI:
    '0x93cab3a66e1d7f4b41ea6b1ef9e648b02519f460fb5dcccac30740c46cb20cd2',

  treasuryCapSUISHARE:
    '0x9bd3d15fa1b217b43b79e52ea3188023b1b506f3d7ae24e4a14b91e3dcd37d6d',
  treasuryCapHUSKISHARE:
    '0xdece693a32a5b3dcd57114e0c902901986b7468edc2ba7a45d8a7e64f6e06486',
  treasuryCapUSDCSHARE:
    '0x73ed9355e8f23bbb919b21f191e0e2a7013578952b1eb6950b6c1c7e875a8fbc',
  treasuryCapUSDTSHARE:
    '0x5ac5a3c4b4c55341fc69e0ca563d59629864c9c17310b10b8e478d08790fa710',
  //
  //odds
  //
  oddsId16: '0x0f3e6980022cdca6ddf0e811cccbd504a32ce06f74ce500fec05d7764215005b',
  oddsId25: '0xeaece1107e38df3e6d853775efd66edbb5320e95437671cf4395810d9d552133',
  oddsId36: '0x60724040c6a05fed0d6d19d16454f2fe2a5c9ba3481bb67a8003d0c2579cd597',

  DECIMALS_ODDS: 10 ** 9,

  //
  // constant numbers
  //
  DECIMALS: 10 ** 9,
  LIMIT_EVENT: 1000,
  LIMIT_CHATROOM: 100,
  LIMIT_NETVALUE: 1000,
  LIMIT_LOTTERY: 1000,
  PAGE_SIZE: 50,
}

export const ADDRESS_SUI = {
  coinType1: '0x2::sui::SUI',
  get coinType2() {
    return `${common.sharesCA}::suishare::SUISHARE`;
  },

  get structType1() {
    return `0x2::coin::Coin<${this.coinType1}>`;
  },
  get structType2() {
    return `0x2::coin::Coin<${this.coinType2}>`;
  },

  bankId: '0x3d35010db01fa1d38022ec825d93b494f5bfaf8ee2a20aada0d0bde0880057e2',

  get structTypeTicket() {
    return `${common.mineCA}::mine::Ticket<${this.coinType1}>`;
  },

  get eventTypeNewPlay() {
    return `${common.mineCA}::mine::NewPlay<${this.coinType1}>`;
  },

  defaultVipId: '0x8cada0691d607fc7915deb735ce3df8fdd88e419629e3c68a9a3c6bcae2a5ee3',
  get eventTypeNewVip() {
    return `${common.mineCA}::mine::NewVip<${this.coinType1}>`;
  },

  get eventTypeNetValue() {
    return `${common.mineCA}::mine::NetValueEvent<${this.coinType1}>`;
  },


  get eventTypeNewGame() {
    return `${common.mineCA}::lottery::NewGame<0x2::sui::SUI>`;
  },
  get eventTypeNewBuy() {
    return `${common.mineCA}::lottery::NewBuy<0x2::sui::SUI>`;
  },
  get eventTypeNewWin() {
    return `${common.mineCA}::mine::NewWin<${this.coinType1}>`;
  },

  get eventTypeTotalStake() {
    return `${common.mineCA}::mine::TotalStake<${this.coinType1}>`;
  },

  get eventTypeMsg() {
    return `${common.mineCA}::suichat::NewMsg`;
  },

  get lotteryType() {
    return `${common.mineCA}::lottery::Game<${this.coinType1}>`;
  },

  profileMarketId: '',

  airdropBankId: '',
}

export const ADDRESS_HUSKI = {

  coinType1: '0x07577ffb6957bbff6f90d3d42a1f5d17618e070f48be73a9545fa972c2159204::token::TOKEN',

  get coinType2() {
    return `${common.sharesCA}::huskishare::HUSKISHARE`;
  },


  get structType1() {
    return `0x2::coin::Coin<${this.coinType1}>`;
  },

  get structType2() {
    return `0x2::coin::Coin<${this.coinType2}>`;
  },


  bankId: '0x0bf956b0c810e15a9618447f775117ff504d9387c7e0f14f5aff2361f46842bb',

  get structTypeTicket() {
    return `${common.mineCA}::mine::Ticket<${this.coinType1}>`;
  },

  get eventTypeNewPlay() {
    return `${common.mineCA}::mine::NewPlay<${this.coinType1}>`;
  },
  //
  // vip
  //

  defaultVipId: '0xefac0be30ef9896095dd653637663e232e3b8eaa114a77c20d44c55da26bb597',

  get eventTypeNewVip() {
    return `${common.mineCA}::mine::NewVip<${this.coinType1}>`;
  },

  get eventTypeNetValue() {
    return `${common.mineCA}::mine::NetValueEvent<${this.coinType1}>`;
  },

  //
  //Lottery EventType
  //
  get eventTypeNewGame() {
    return `${common.mineCA}::lottery::NewGame<0x2::sui::SUI>`;
  },
  get eventTypeNewBuy() {
    return `${common.mineCA}::lottery::NewBuy<0x2::sui::SUI>`;
  },
  get eventTypeNewWin() {
    return `${common.mineCA}::mine::NewWin<${this.coinType1}>`;
  },
  //
  //Stake EventType
  //
  get eventTypeTotalStake() {
    return `${common.mineCA}::mine::TotalStake<${this.coinType1}>`;
  },
  //
  // sui-chat
  //
  // export const suichatContractModule = 'suichat'

  get eventTypeMsg() {
    return `${common.mineCA}::suichat::NewMsg`;
  },
  //
  //lottery
  //
  get lotteryType() {
    return `${common.mineCA}::lottery::Game<${this.coinType1}>`;
  },

  //
  // profile
  //

  profileMarketId: '',

  airdropBankId: '',

}

export const ADDRESS_USDC = {
  //
  // Coin Type
  //

  coinType1: '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN',


  get coinType2() {
    return `${common.sharesCA}::usdcshare::USDCSHARE`;
  },

  //
  // Coin StructType
  //

  get structType1() {
    return `0x2::coin::Coin<${this.coinType1}>`;
  },

  get structType2() {
    return `0x2::coin::Coin<${this.coinType2}>`;
  },


  bankId: '',
  //
  // huski-mine
  //
  //
  // Mine Ticket Type
  //

  get structTypeTicket() {
    return `${common.mineCA}::mine::Ticket<${this.coinType1}>`;
  },

  get eventTypeNewPlay() {
    return `${common.mineCA}::mine::NewPlay<${this.coinType1}>`;
  },
  //
  // vip
  //

  defaultVipId: '',

  get eventTypeNewVip() {
    return `${common.mineCA}::mine::NewVip<${this.coinType1}>`;
  },

  get eventTypeNetValue() {
    return `${common.mineCA}::mine::NetValueEvent<${this.coinType1}>`;
  },

  //
  //Lottery EventType
  //
  get eventTypeNewGame() {
    return `${common.mineCA}::lottery::NewGame<0x2::sui::SUI>`;
  },
  get eventTypeNewBuy() {
    return `${common.mineCA}::lottery::NewBuy<0x2::sui::SUI>`;
  },
  get eventTypeNewWin() {
    return `${common.mineCA}::mine::NewWin<${this.coinType1}>`;
  },
  //
  //Stake EventType
  //
  get eventTypeTotalStake() {
    return `${common.mineCA}::mine::TotalStake<${this.coinType1}>`;
  },
  //
  // sui-chat
  //
  // export const suichatContractModule = 'suichat'

  get eventTypeMsg() {
    return `${common.mineCA}::suichat::NewMsg`;
  },
  //
  //lottery
  //
  get lotteryType() {
    return `${common.mineCA}::lottery::Game<${this.coinType1}>`;
  },

  //
  // profile
  //

  profileMarketId: '',

  airdropBankId: '',

}

export const ADDRESS_USDT = {

  coinType1: '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN',


  get coinType2() {
    return `${common.sharesCA}::usdtshare::USDTSHARE`;
  },

  //
  // Coin StructType
  //

  get structType1() {
    return `0x2::coin::Coin<${this.coinType1}>`;
  },

  get structType2() {
    return `0x2::coin::Coin<${this.coinType2}>`;
  },


  bankId: '',
  //
  // huski-mine
  //
  //
  // Mine Ticket Type
  //

  get structTypeTicket() {
    return `${common.mineCA}::mine::Ticket<${this.coinType1}>`;
  },

  get eventTypeNewPlay() {
    return `${common.mineCA}::mine::NewPlay<${this.coinType1}>`;
  },
  //
  // vip
  //

  defaultVipId: '',

  get eventTypeNewVip() {
    return `${common.mineCA}::mine::NewVip<${this.coinType1}>`;
  },

  get eventTypeNetValue() {
    return `${common.mineCA}::mine::NetValueEvent<${this.coinType1}>`;
  },

  //
  //Lottery EventType
  //
  get eventTypeNewGame() {
    return `${common.mineCA}::lottery::NewGame<0x2::sui::SUI>`;
  },
  get eventTypeNewBuy() {
    return `${common.mineCA}::lottery::NewBuy<0x2::sui::SUI>`;
  },
  get eventTypeNewWin() {
    return `${common.mineCA}::mine::NewWin<${this.coinType1}>`;
  },
  //
  //Stake EventType
  //
  get eventTypeTotalStake() {
    return `${common.mineCA}::mine::TotalStake<${this.coinType1}>`;
  },
  //
  // sui-chat
  //
  // export const suichatContractModule = 'suichat'

  get eventTypeMsg() {
    return `${common.mineCA}::suichat::NewMsg`;
  },
  //
  //lottery
  //
  get lotteryType() {
    return `${common.mineCA}::lottery::Game<${this.coinType1}>`;
  },

  //
  // profile
  //

  profileMarketId: '',

  airdropBankId: '',

}

export const ADDRESS_BLUB = {
  //
  // Coin Type
  //

  coinType1: '0xfa7ac3951fdca92c5200d468d31a365eb03b2be9936fde615e69f0c1274ad3a0::BLUB::BLUB',


  get coinType2() {
    return '0x171054049325c40a713d6bfa8fb77e54ddcc6f81da1af9ddf21d7ec9bb9501ab::blubshare::BLUBSHARE';
  },

  //
  // Coin StructType
  //

  get structType1() {
    return `0x2::coin::Coin<${this.coinType1}>`;
  },

  get structType2() {
    return `0x2::coin::Coin<${this.coinType2}>`;
  },


  bankId: '0x425c851b91ea043ef11e37b2519be88006bf4894a70c1eeefe3a40f20c4402d2',
  //
  // huski-mine
  //
  //
  // Mine Ticket Type
  //

  get structTypeTicket() {
    return `${common.mineCA}::mine::Ticket<${this.coinType1}>`;
  },

  get eventTypeNewPlay() {
    return `${common.mineCA}::mine::NewPlay<${this.coinType1}>`;
  },
  //
  // vip
  //

  defaultVipId: '0xd16be59b923fcb0999b60c242e684f4d82e0b4ab7e675286af71890d8ebf5880',

  get eventTypeNewVip() {
    return `${common.mineCA}::mine::NewVip<${this.coinType1}>`;
  },

  get eventTypeNetValue() {
    return `${common.mineCA}::mine::NetValueEvent<${this.coinType1}>`;
  },

  //
  //Lottery EventType
  //
  get eventTypeNewGame() {
    return `${common.mineCA}::lottery::NewGame<0x2::sui::SUI>`;
  },
  get eventTypeNewBuy() {
    return `${common.mineCA}::lottery::NewBuy<0x2::sui::SUI>`;
  },
  get eventTypeNewWin() {
    return `${common.mineCA}::mine::NewWin<${this.coinType1}>`;
  },
  //
  //Stake EventType
  //
  get eventTypeTotalStake() {
    return `${common.mineCA}::mine::TotalStake<${this.coinType1}>`;
  },
  //
  // sui-chat
  //
  // export const suichatContractModule = 'suichat'

  get eventTypeMsg() {
    return `${common.mineCA}::suichat::NewMsg`;
  },
  //
  //lottery
  //
  get lotteryType() {
    return `${common.mineCA}::lottery::Game<${this.coinType1}>`;
  },

  //
  // profile
  //

  profileMarketId: '',

  airdropBankId: '',

}

export const contract = {
  ADDRESS: ADDRESS_SUI
}
