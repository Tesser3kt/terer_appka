from PIL import Image
import segno

BASE_URL = "https://terer-appka.web.app/qr/"
TICKET_FOLDER = "tickets"
TICKET_WIDTH = 2000
TICKET_HEIGHT = 647
QR_FOLDER = "qr"
QR_SIZE = 200

BLOCK_SIZE = 250
OFFSET_Y = 218

A4_RATIO = 297 / 210
A4_FOLDER = "a4"
TICKETS_PER_A4 = 4
TICKET_GAP = 80


def generate_qrs():
    with open("codes.txt", "r", encoding="utf-8") as f:
        codes = f.read().splitlines()

        for code in codes:
            qr = segno.make(f"{BASE_URL}{code}")
            qr.save(f"{QR_FOLDER}/{code}.png", scale=QR_SIZE)


def create_ticket(code: str):
    template = Image.open("template.png")

    qr = Image.open(f"{QR_FOLDER}/{code}.png")
    qr = qr.resize((BLOCK_SIZE, BLOCK_SIZE))
    offset = 5, OFFSET_Y

    template.paste(qr, offset)
    template.save(f"{TICKET_FOLDER}/{code}.png")


def split_into_A4s():
    background = Image.new(
        "RGB", (TICKET_WIDTH, int(TICKET_WIDTH * A4_RATIO)), (255, 255, 255)
    )
    with open("codes.txt", "r", encoding="utf-8") as f:
        codes = f.read().splitlines()

    offset_y = 0
    for i, code in enumerate(codes):https://terer-appka.web.app/
        ticket = Image.open(f"{TICKET_FOLDER}/{code}.png")
        background.paste(ticket, (0, offset_y))
        offset_y += TICKET_HEIGHT + TICKET_GAP

        if (i + 1) % TICKETS_PER_A4 == 0 or i == len(codes) - 1:
            offset_y = 0
            if i == len(codes) - 1:
                background.save(f"{A4_FOLDER}/{(i + 1) // 4 + 1}.png")
            else:
                background.save(f"{A4_FOLDER}/{(i + 1) // 4}.png")
            background = Image.new(
                "RGB", (TICKET_WIDTH, int(TICKET_WIDTH * A4_RATIO)), (255, 255, 255)
            )


if __name__ == "__main__":
    generate_qrs()
    print("QR codes generated")
    with open("codes.txt", "r", encoding="utf-8") as f:
        codes = f.read().splitlines()

        for code in codes:
            create_ticket(code)
            print(f"Ticket {code} created.")
    split_into_A4s()
