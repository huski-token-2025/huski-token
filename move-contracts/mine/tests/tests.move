// // Copyright (c) Mysten Labs, Inc.
// // SPDX-License-Identifier: Apache-2.0

// #[test_only]
// module game::tests {
//     use sui::sui::SUI;
//     use sui::random::{Self, Random};
//     use sui::coin::{mint_for_testing as mint};
//     use sui::test_scenario::{Self as test, next_tx, ctx};
//     use sui::package::{Publisher};
//     // use std::debug;
//     use game::mine::{Self, Bank};
//     use game::sshare::{Self, SSHARE};

//     // const ONE_SUI:u64 = 1000000000;
//     #[test]
//     fun test_game() {
//         let user1 = @0x0;
//         let mut ts = test::begin(user1);
//         mine::test_init(ctx(&mut ts));
//         sshare::test_init(ctx(&mut ts));
//         next_tx(&mut ts, user1);

//         // TODO: add mint sshares and add into bank
//         let publisher = test::take_from_address<Publisher>(&ts,user1);
//         mine::create_bank<SUI,SSHARE>(&publisher, ctx(&mut ts));
//         next_tx(&mut ts, user1);

//         // Setup randomness
//         random::create_for_testing(ts.ctx());
//         next_tx(&mut ts, user1);
//         let mut random_state: Random = ts.take_shared();
//         random_state.update_randomness_state_for_testing(
//             0,
//             x"FF",
//             ts.ctx(),
//         );
        
//         // let mut bank = test::take_shared<Bank<SUI,SSHARE>>(&ts);
//         // debug::print(&bank);

//         // let sui=mint<SUI>(ONE_SUI, ctx(&mut ts));
//         // mine::mine_16<SUI,SSHARE>(&random_state, &mut bank, sui, 10, ts.ctx());

//         // test::return_shared(bank);
//         test::return_shared(random_state);
//         test::return_to_address(user1, publisher);
//         ts.end();
//     }
// }
