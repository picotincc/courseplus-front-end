const HOST = "";
// const HOST = "http://127.0.0.1:3000";

const DEFAULT_AVATOR = "http://ofjhruj62.bkt.clouddn.com/user_avatar_1?e=1477992111&token=hdZdapjcdEK2vbVKTo--ETEciepTc9Eqs12BKS7T:qZGpV8Mf9ke4QP0Lv3_YgMHp9Zo=";

const PAY_CHANNEL = {
    "ALIPAY": "alipay_pc_direct"
};

const ORDER_TYPE = {
    "RESOURCE": 1,
    "QUESTION": 2,
    "SINGLE_COURSE" : 3,
    "ALL_COURSE": 4
};

const EVENT_NAME = {
    "ADD_QUESTION_INFO": "dispatch question info"
}

export {
    HOST,
    DEFAULT_AVATOR,
    ORDER_TYPE,
    PAY_CHANNEL,
    EVENT_NAME
};
