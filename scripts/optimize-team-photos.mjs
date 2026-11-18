/**
 * Оптимизация фотографий сотрудников.
 *
 *   npm run photos
 *
 * Берёт исходники из src/assets/images/team/source/ (любые jpg/png/webp,
 * любые имена), обрезает по центру под пропорцию карточки 3:4, уменьшает
 * и сохраняет в webp + jpg в src/assets/images/team/ под именами team-1..N.
 *
 * Порядок файлов задаётся в списке FILES ниже — если в папке лежат файлы
 * с другими именами, они просто обработаются по алфавиту.
 */
import { readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'src/assets/images/team/source';
const OUT = 'src/assets/images/team';

// Пропорция карточки в блоке команды: h-60 при ширине колонки ~ 4:5
const TARGET_RATIO = 4 / 5;
const TARGET_WIDTH = 800;

async function main() {
  if (!existsSync(SRC)) {
    await mkdir(SRC, { recursive: true });
    console.error(`Положите исходные фото в ${SRC} и запустите снова.`);
    process.exit(0);
  }

  const files = (await readdir(SRC))
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, 'ru', { numeric: true }));

  if (files.length === 0) {
    console.error(`В ${SRC} нет изображений.`);
    process.exit(0);
  }

  for (const [i, file] of files.entries()) {
    const idx = i + 1;
    const input = path.join(SRC, file);
    const image = sharp(input).rotate();
    const meta = await image.metadata();

    const w = meta.width ?? TARGET_WIDTH;
    const h = meta.height ?? TARGET_WIDTH;
    // Обрезаем по центру под вертикальный кадр, чтобы лицо не уезжало
    let cropW = w;
    let cropH = Math.round(w / TARGET_RATIO);
    if (cropH > h) {
      cropH = h;
      cropW = Math.round(h * TARGET_RATIO);
    }
    const left = Math.round((w - cropW) / 2);
    // Небольшой сдвиг вверх: лица обычно в верхней трети кадра
    const top = Math.max(0, Math.round((h - cropH) * 0.25));

    const pipeline = image.extract({ left, top, width: cropW, height: cropH }).resize(TARGET_WIDTH, Math.round(TARGET_WIDTH / TARGET_RATIO), {
      fit: 'cover',
    });

    await pipeline.clone().webp({ quality: 82 }).toFile(path.join(OUT, `team-${idx}.webp`));
    await pipeline.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, `team-${idx}.jpg`));

    console.log(`team-${idx}  ←  ${file}`);
  }

  console.log(`\nГотово: ${files.length} фото обработано в ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
