import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const directory = path.join(process.cwd(), 'data');
const file = path.join(directory, 'regalos.json');
let pendingWrite = Promise.resolve();

async function readReservations() {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return {};
    throw error;
  }
}

export async function GET() {
  try {
    const reservations = await readReservations();
    return Response.json({ reserved: Boolean(reservations.microondas) }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'No pudimos cargar los regalos. Intentá nuevamente.' }, { status: 500 });
  }
}

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch {
    return Response.json({ error: 'Los datos enviados no son válidos.' }, { status: 400 });
  }
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  if (body?.gift !== 'microondas' || !name || name.length > 100) {
    return Response.json({ error: 'Ingresá tu nombre (hasta 100 caracteres).' }, { status: 400 });
  }

  // Serialize reservations so simultaneous submissions cannot overwrite each other.
  const operation = pendingWrite.then(async () => {
    const reservations = await readReservations();
    if (reservations.microondas) {
      return Response.json({ error: 'Este regalo ya está reservado.', reserved: true }, { status: 409 });
    }
    reservations.microondas = { name, reservedAt: new Date().toISOString() };
    await mkdir(directory, { recursive: true });
    await writeFile(`${file}.tmp`, `${JSON.stringify(reservations, null, 2)}\n`, 'utf8');
    await rename(`${file}.tmp`, file);
    return Response.json({ reserved: true }, { status: 201 });
  });
  pendingWrite = operation.catch(() => {});
  try { return await operation; } catch {
    return Response.json({ error: 'No pudimos guardar tu reserva. Intentá nuevamente.' }, { status: 500 });
  }
}
