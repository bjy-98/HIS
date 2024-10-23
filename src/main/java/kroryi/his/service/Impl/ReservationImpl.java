package kroryi.his.service.Impl;

import jakarta.persistence.EntityNotFoundException;
import kroryi.his.domain.Reservation;
import kroryi.his.dto.ReservationDTO;
import kroryi.his.mapper.ReservationMapper;
import kroryi.his.repository.ReservationRepository;
import kroryi.his.service.ReservationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservationImpl implements ReservationService {

    private final ModelMapper modelMapper;

    @Autowired
    private ReservationMapper reMapper;

    @Autowired
    private ReservationRepository reRepo;

    @Autowired
    public ReservationImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }


    // 캘린더에서 날짜 선택시
    public List<ReservationDTO> selectedDatePatientList(ReservationDTO dto) {

        // 문자열 형식으로 날짜 가져오기
        String reservationDate = dto.getReservationDate(); // "2024-10-21" 형식
        List<Reservation> reservations = reRepo.findByReservationDate(reservationDate);

        // 콘솔에 예약 목록 출력
        System.out.println("선택한 날짜: " + reservationDate);
        System.out.println("예약 목록: " + reservations);

        return reservations.stream()
                .map(reservation -> modelMapper.map(reservation, ReservationDTO.class))
                .collect(Collectors.toList());
    }


    // 환자의 예약 정보 확인
    public List<ReservationDTO> selectedByReservation(ReservationDTO dto) {
        List<Reservation> reservations = reRepo.findBySeq(dto.getSeq());
        return reservations.stream()
                .map(reservation -> modelMapper.map(reservation, ReservationDTO.class))
                .collect(Collectors.toList());
    }

    // 예약에서 저장을 눌렀을 경우
    public List<ReservationDTO> insertReservationInformation(ReservationDTO dto) {
        // ReservationDTO를 Reservation으로 변환
        Reservation reservation = modelMapper.map(dto, Reservation.class);

        // 예약 정보 저장
        reRepo.save(reservation);

        // 저장된 예약 정보를 다시 DTO로 변환
        ReservationDTO savedDto = modelMapper.map(reservation, ReservationDTO.class);

        // 결과를 리스트에 담아 반환
        return Collections.singletonList(savedDto);
    }



    // 예약에서 수정을 눌렀을 경우
    public void updateReservationInformation(ReservationDTO dto) {
        Optional<Reservation> optionalReservation = reRepo.findById(dto.getSeq());

        if (optionalReservation.isPresent()) {
            Reservation reservation = optionalReservation.get();
            modelMapper.map(dto, reservation); // DTO의 값을 기존 엔티티에 맵핑
            reRepo.save(reservation);
        } else {
            throw new EntityNotFoundException("Reservation not found with seq: " + dto.getSeq());
        }
    }

    @Override
    public void deleteReservation(Long seq) {
        if (!reRepo.existsById(seq)) {
            throw new EntityNotFoundException("Reservation not found with seq: " + seq);
        }
        reRepo.deleteById(seq);

    }

    @Override
    public List<ReservationDTO> getReservations(String chartNumber, String reservationDate) {
        List<Reservation> reservations = reRepo.findByChartNumberAndReservationDate(chartNumber, reservationDate);
        return reservations.stream()
                .map(reservation -> new ReservationDTO(
                        reservation.getSeq(),
                        reservation.getReservationDate(),
                        reservation.getDepartment(),
                        reservation.isSnsNotification(),
                        reservation.getChartNumber(),
                        reservation.getDoctor(),
                        reservation.getTreatmentType(),
                        reservation.getPatientNote(),
                        reservation.getReservationStatusCheck()
                ))
                .collect(Collectors.toList());
    }
}



