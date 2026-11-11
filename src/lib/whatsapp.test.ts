import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { buildWhatsAppUrl, normalizePhone } from "./whatsapp.ts";

describe("normalizePhone", () => {
  test("remove máscara, espaços e o sinal de +", () => {
    assert.equal(normalizePhone("+55 (11) 99999-9999"), "5511999999999");
  });

  test("rejeita números curtos, longos ou com zero à esquerda", () => {
    assert.throws(() => normalizePhone("123"));
    assert.throws(() => normalizePhone("1234567890123456"));
    assert.throws(() => normalizePhone("0551199999999"));
    assert.throws(() => normalizePhone(""));
  });
});

describe("buildWhatsAppUrl", () => {
  test("sempre aponta para https://wa.me", () => {
    const url = new URL(buildWhatsAppUrl("5511999999999", "Olá"));
    assert.equal(url.protocol, "https:");
    assert.equal(url.hostname, "wa.me");
    assert.equal(url.pathname, "/5511999999999");
  });

  test("codifica a mensagem sem permitir injeção na URL", () => {
    const message = 'Olá! "Relaxante" & <script>alert(1)</script> #topo ?x=1';
    const url = buildWhatsAppUrl("5511999999999", message);

    assert.ok(!url.includes("<") && !url.includes(">") && !url.includes('"'));
    assert.equal(new URL(url).searchParams.get("text"), message);
    assert.equal(new URL(url).hash, "");
  });

  test("sem mensagem (ou só espaços), gera link sem parâmetro text", () => {
    assert.equal(buildWhatsAppUrl("5511999999999"), "https://wa.me/5511999999999");
    assert.equal(buildWhatsAppUrl("5511999999999", "   "), "https://wa.me/5511999999999");
  });

  test("propaga o erro de número inválido", () => {
    assert.throws(() => buildWhatsAppUrl("abc", "Olá"));
  });
});
