import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { handleTransfer } from "../src/lock";
import { createTransferEvent } from "./lock-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let from = Address.fromString("0xf39284dff97bb25915897496ab7fa33f82c355ff");
    let to = Address.fromString("0xf39284dff97bb25915897496ab7fa33f82c355f3");
    let value = BigInt.fromI32(384);
    let newTransferEvent = createTransferEvent(from, to, value);
    handleTransfer(newTransferEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Transfer created and stored", () => {
    assert.entityCount("Transfer", 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Transfer",
      "0x0c047da19dde3fe6ca4796f222810f83f1f1378edaec371090ba4bd70430e7e37c000000",
      "from",
      "0xf39284dff97bb25915897496ab7fa33f82c355ff"
    );
    assert.fieldEquals(
      "Transfer",
      "0x0c047da19dde3fe6ca4796f222810f83f1f1378edaec371090ba4bd70430e7e37c000000",
      "to",
      "0xf39284dff97bb25915897496ab7fa33f82c355f3"
    );
    assert.fieldEquals(
      "Transfer",
      "0x0c047da19dde3fe6ca4796f222810f83f1f1378edaec371090ba4bd70430e7e37c000000",
      "value",
      "384"
    );
  });
});
