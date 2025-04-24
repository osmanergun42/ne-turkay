// Bernoulli Denklemi Hesaplama
const bernoulliForm = document.getElementById('bernoulliForm');
const sonucDiv = document.getElementById('sonuc');

bernoulliForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Kullanıcıdan alınan değerler
  const p1 = parseFloat(document.getElementById('p1').value);
  const v1 = parseFloat(document.getElementById('v1').value);
  const z1 = parseFloat(document.getElementById('z1').value);
  const v2 = parseFloat(document.getElementById('v2').value);
  const z2 = parseFloat(document.getElementById('z2').value);
  const rho = parseFloat(document.getElementById('rho').value);

  // Bernoulli Denklemi: P₁ + (1/2)ρv₁² + ρgz₁ = P₂ + (1/2)ρv₂² + ρgz₂
  // P₂'yi hesapla:
  const p2 = p1 + 0.5 * rho * (v1 ** 2) + rho * 9.81 * z1 - (0.5 * rho * (v2 ** 2) + rho * 9.81 * z2);

  // Sonuçları ekrana yazdır
  sonucDiv.innerHTML = `<p><strong>P₂ (Pa):</strong> ${p2.toFixed(2)} Pa</p>`;
});

// Reynolds Sayısı Hesaplama
const reynoldsForm = document.getElementById('reynoldsForm');
const reynoldsSonucDiv = document.getElementById('reynoldsSonuc');

reynoldsForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Kullanıcıdan alınan değerler
  const rhoRe = parseFloat(document.getElementById('rhoRe').value);
  const vRe = parseFloat(document.getElementById('vRe').value);
  const dRe = parseFloat(document.getElementById('dRe').value);
  const muRe = parseFloat(document.getElementById('muRe').value);

  // Reynolds Sayısı: Re = (ρvD)/μ
  const re = (rhoRe * vRe * dRe) / muRe;

  // Sonuçları ekrana yazdır
  reynoldsSonucDiv.innerHTML = `<p><strong>Reynolds Sayısı (Re):</strong> ${re.toFixed(2)}</p>`;
});

// Mach Sayısı Hesaplama
const machForm = document.getElementById('machForm');
const machSonucDiv = document.getElementById('machSonuc');

machForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Kullanıcıdan alınan değerler
  const vMach = parseFloat(document.getElementById('vMach').value);
  const aMach = parseFloat(document.getElementById('aMach').value);

  // Mach Sayısı: M = v / a
  const mach = vMach / aMach;

  // Sonuçları ekrana yazdır
  machSonucDiv.innerHTML = `<p><strong>Mach Sayısı (M):</strong> ${mach.toFixed(2)}</p>`;
});
