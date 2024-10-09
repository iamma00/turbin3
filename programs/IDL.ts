import { Turbin3Prereq } from "./Turbin3_prereq";

// Export the IDL constant

export const IDL: Turbin3Prereq = {
  version: "0.1.0",
  name: "wba_prereq",
  metadata: {
    address: "WBAQSygkwMox2VuWKU133NxFrpDZUBdvSBeaBEue2Jq",
    name: "wba_prereq",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  _instructions: [
    {
      name: "complete",
      _accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "prereq",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              { kind: "const", value: [112, 114, 101, 114, 101, 113] }, // "prereq" as a byte array
              { kind: "account", path: "signer" },
            ],
          },
        },
        {
          _name_1: "system_program",
          get name() {
            return this._name_1;
          },
          set name(value) {
            this._name_1 = value;
          },
          isMut: false,
        },
      ],
      get accounts_1() {
        return this.accounts;
      },
      set accounts_1(value) {
        this.accounts = value;
      },
      get accounts() {
        return this.accounts;
      },
      set accounts(value) {
        this._accounts = value;
      },
      args: [
        {
          name: "github",
          type: "bytes", // Argument for GitHub
        },
      ],
    },
    {
      _name: "update",
      get name() {
        return this._name;
      },
      set name(value) {
        this._name = value;
      },
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "prereq",
          isMut: true,
          isSigner: false,
        },
        {
          name: "system_program",
          isMut: false,
        },
      ],
      args: [
        {
          name: "github",
          type: "bytes",
        },
      ],
    },
  ],
  get instructions_5() {
    return this._instructions;
  },
  set instructions_5(value) {
    this._instructions = value;
  },
  get instructions_4() {
    return this.instructions;
  },
  set instructions_4(value) {
    this.instructions = value;
  },
  get instructions_3() {
    return this.instructions;
  },
  set instructions_3(value) {
    this.instructions = value;
  },
  get instructions_2() {
    return this.instructions;
  },
  set instructions_2(value) {
    this.instructions = value;
  },
  get instructions_1() {
    return this.instructions;
  },
  set instructions_1(value) {
    this.instructions = value;
  },
  get instructions() {
    return this.instructions;
  },
  set instructions(value) {
    this.instructions = value;
  },
  accounts: [
    {
      name: "Q2Prereq2024",
      discriminator: [210, 203, 168, 103, 251, 233, 204, 6],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidGithubAccount",
      msg: "Invalid Github account",
    },
  ],
  types: [
    {
      name: "Q2Prereq2024",
      type: {
        kind: "struct",
        fields: [
          {
            name: "github",
            type: "bytes",
          },
          {
            name: "key",
            type: "pubkey",
          },
        ],
      },
    },
  ],
};
